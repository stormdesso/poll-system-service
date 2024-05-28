package ru.pstu.poll_system_service.data.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.mapper.PollMapper;
import ru.pstu.poll_system_service.data.model.Poll;
import ru.pstu.poll_system_service.data.model.UserAnswer;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.repository.UserAnswerRepository;
import ru.pstu.poll_system_service.web.common.UserDetailsUtil;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.util.List;

import static ru.pstu.poll_system_service.data.enums.StatusEnum.active;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService{

    private final PollRepository pollRepository;
    private final UserAnswerRepository userAnswerRepository;

//    public Page<PollDto> getFilteredPolls(String sortingField, Long limit, Long page) {
//
//        String sortDirection = FilterUtil.getSortDirection(sortingField);   //  todo: переделать на класс PollFilter
//        sortingField = FilterUtil.formatSortingField(sortingField);
//
//        Pageable pageable = PageRequest.of( page.intValue(), limit.intValue(), getSort(sortingField, sortDirection) );
//
//        org.springframework.data.domain.Page<Poll> pollEntitiesPage = pollRepository.findAll((Specification<Poll>) null,
//                pageable);
//
//
//        return new Page<>(PollMapper.INSTANCE.toPollDtos(pollEntitiesPage.getContent()),
//                pollEntitiesPage.getTotalElements(), pollEntitiesPage.stream().count());
//    }

    @Override
    public Page<PollDto> getFilteredPolls(PollFilter pollFilter){
        Pageable pageable = PageRequest.of( pollFilter.getPage().intValue(), pollFilter.getLimit().intValue(),
                getSort(pollFilter.getSortableField(), pollFilter.getDirection()) );

        org.springframework.data.domain.Page<Poll> pollEntitiesPage = pollRepository.findAll((Specification<Poll>) null,
                pageable);

        return new Page<>(PollMapper.INSTANCE.toPollDtos(pollEntitiesPage.getContent()),
                pollEntitiesPage.getTotalElements(), pollEntitiesPage.stream().count());
    }

    private List<Poll> findAvailablePolls(){
        var user =  UserDetailsUtil.getCurrentUserFromContext();
        return pollRepository.getAvailablePollsForUser(user.getAddressId(),user.getId());
    }

    private Poll getPoll(Long pollId){
        var user =  UserDetailsUtil.getCurrentUserFromContext();
        var poll = pollRepository.findPollByIdEquals(pollId).orElseThrow(()
                -> new IllegalArgumentException("Опрос не существует или не доступен!"));

        if (!poll.getStatus().equals(active) || !pollRepository.pollIsAvailable(poll.getId(), user.getId()))
            throw new IllegalArgumentException("Опрос не доступен для пользователя!");

        return poll;
    }

    private Sort getSort(String sortingField, String sortOrder) {
        if (sortingField != null && !sortingField.isEmpty() && sortOrder != null && !sortOrder.isEmpty()) {
            return Sort.by(Sort.Direction.fromString(sortOrder), sortingField);
        }
        return Sort.unsorted();
    }

    @Override
    @Transactional
    public void vote(Long pollId,PollValueDto pollValueDto){
        // todo: проверить имеющуюся систему голосования

        Long userId =  UserDetailsUtil.getCurrentUserIdFromContext();

        var poll = getPoll(pollId);

        //проверяем существует ли такой вариант ответа у опроса
        poll.getPollValues().stream()
                .filter( pollValue -> pollValueDto.getId().equals(pollValue.getId()) )
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Вариант ответа не существует!"));

        var votes = userAnswerRepository.getNumberOfVotesByUser(userId, pollId);
        if (poll.getMaxNumberAnswersByUser() <= votes){
            throw new IllegalArgumentException(
                    "Максимальное число вариантов ответа для пользователя, " +
                            "за которые он может проголосовать в данном опросе: " + poll.getMaxNumberAnswersByUser() +
                            " текущее число голосов: " + votes
            );
        }

        if (userAnswerRepository.existsByUserIdEqualsAndPollValueIdEquals(userId, pollValueDto.getId()))
        {
            throw new IllegalArgumentException("Нельзя проголосовать за один вариант ответа более 1 раза!");
        }

        userAnswerRepository.save(
                UserAnswer.builder()
                        .userId(userId)
                        .pollValueId(pollValueDto.getId())
                        .build()
        );
    }
}
