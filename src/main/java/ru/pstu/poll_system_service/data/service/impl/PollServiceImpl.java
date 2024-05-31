package ru.pstu.poll_system_service.data.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.mapper.PollMapper;
import ru.pstu.poll_system_service.data.model.Poll;
import ru.pstu.poll_system_service.data.model.UserAnswer;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.repository.UserAnswerRepository;
import ru.pstu.poll_system_service.data.service.GeneralService;
import ru.pstu.poll_system_service.data.service.PollService;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.util.List;

import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserFromContext;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@Slf4j
@RequiredArgsConstructor
public class PollServiceImpl implements PollService {

    private final PollRepository pollRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final GeneralService generalService;

    @Override
    public Page<PollDto> getFilteredPolls(PollFilter pollFilter){
        Long ownershipId = getCurrentUserFromContext().getOwnershipId();

        Pageable pageable = PageRequest.of( pollFilter.getPage().intValue(), pollFilter.getLimit().intValue(),
                getSort(pollFilter.getSortableField(), pollFilter.getDirection()) );

        var ids = pollRepository.findAvailablePollsIdsForUser(ownershipId, getCurrentUserIdFromContext());
        org.springframework.data.domain.Page<Poll> pollEntitiesPage = pollRepository.findAllByIdIn(ids, pageable);

        var pollDtoPage =  new Page<>(PollMapper.INSTANCE.toPollDtos(pollEntitiesPage.getContent()),
                pollEntitiesPage.getTotalElements(), pollEntitiesPage.stream().count());

        pollDtoPage.getItems().forEach(pd ->{
                pd.setMaxNumberVoted(pollRepository.getMaxNumberVoted(pd.getId()));
                pd.setUserIsVoted(pollRepository.userIsVoted(pd.getId(), getCurrentUserIdFromContext()));
            }
        );

        return pollDtoPage;
    }


    @NotNull
    private  Poll getPoll(Long pollId){
        var poll = pollRepository.findPollByIdEquals(pollId).orElseThrow(()
                -> new IllegalArgumentException("Опрос не существует или не доступен!"));
        generalService.hasAccessToPolls(List.of(pollId));
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
        Long userId =  getCurrentUserIdFromContext();
        var poll = getPoll(pollId);

        log.debug("Проверка, может ли пользователь проголосовать в опросе");

        if(pollRepository.userIsVoted(pollId, userId)){
            throw new IllegalArgumentException("Пользователь уже голосовал в опросе!");
        }

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

        if (userAnswerRepository.existsByUserIdEqualsAndPollValueIdEquals(userId, pollValueDto.getId())){
            throw new IllegalArgumentException("Нельзя проголосовать за один вариант ответа более 1 раза!");
        }

        log.debug("Все проверки пройдены");

        userAnswerRepository.save(
                UserAnswer.builder()
                        .userId(userId)
                        .pollValueId(pollValueDto.getId())
                        .build()
        );
    }
}
