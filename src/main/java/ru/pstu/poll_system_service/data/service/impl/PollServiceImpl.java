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
import ru.pstu.poll_system_service.data.model.PollValue;
import ru.pstu.poll_system_service.data.model.UserAnswer;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.repository.UserAnswerRepository;
import ru.pstu.poll_system_service.data.repository.UserRepository;
import ru.pstu.poll_system_service.data.service.GeneralService;
import ru.pstu.poll_system_service.data.service.PollService;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.CreatePollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static ru.pstu.poll_system_service.data.enums.StatusEnum.planned;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserFromContext;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@Slf4j
@RequiredArgsConstructor
public class PollServiceImpl implements PollService {

    private final PollRepository pollRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final UserRepository userRepository;
    private final GeneralService generalService;

    @Override
    public Page<PollDto> getFilteredPolls(PollFilter pollFilter){
        Long ownershipId = getCurrentUserFromContext().getOwnershipId();

        Pageable pageable = PageRequest.of( pollFilter.getPage().intValue(), pollFilter.getLimit().intValue(),
                getSort(pollFilter.getSortableField(), pollFilter.getDirection()) );

        var ids = pollRepository.findAvailablePollsIdsForUser(ownershipId, getCurrentUserIdFromContext());

        org.springframework.data.domain.Page<Poll> pollEntitiesPage;
        if (pollFilter.isSpecificationIsEmpty()){
            pollEntitiesPage = pollRepository.findAllByIdIn(ids,pageable);
        }else {
            pollEntitiesPage = pollRepository.findAll(
                    pollFilter.getSpecification().and(pollFilter.idIn(ids)),
                    pageable);
        }

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
    public void vote(Long pollId,List<PollValueDto> pollValueDtoList){
        // todo: проверить имеющуюся систему голосования
        Long userId =  getCurrentUserIdFromContext();
        var poll = getPoll(pollId);

        log.debug("Проверка, может ли пользователь проголосовать в опросе");

        if(pollRepository.userIsVoted(pollId, userId)){
            throw new IllegalArgumentException("Пользователь уже голосовал в опросе!");
        }

        var pollValuesIds = new java.util.ArrayList<>(poll.getPollValues().stream().map(PollValue::getId).toList());
        var pollValueDtosIds = new java.util.ArrayList<>(pollValueDtoList.stream().map(PollValueDto::getId).toList());

        if(! pollValuesIds.containsAll(pollValueDtosIds) ){
            throw new IllegalArgumentException("Указаны неверные варианты ответа!");
        }

        var votes = userAnswerRepository.getNumberOfVotesByUser(userId, pollId);
        if (poll.getMaxNumberAnswersByUser() <= votes){
            throw new IllegalArgumentException(
                    "Максимальное число вариантов ответа для пользователя, " +
                            "за которые он может проголосовать в данном опросе: " + poll.getMaxNumberAnswersByUser() +
                            " текущее число голосов: " + votes
            );
        }

        //todo: переделать проверку
//        if (userAnswerRepository.existsByUserIdEqualsAndPollValueIdEquals(userId, pollValueDtoList.stream().map(PollValueDto::getId))){
//            throw new IllegalArgumentException("Нельзя проголосовать за один вариант ответа более 1 раза!");
//        }

        log.debug("Все проверки пройдены");

        var list = pollValueDtoList.stream().map(pollValueDto -> UserAnswer.builder()
                .userId(userId)
                .pollValueId(pollValueDto.getId())
                .build()).collect(Collectors.toCollection(ArrayList::new));

        userAnswerRepository.saveAll(list);
    }

    @Override
    public Long save(CreatePollDto createPollDto) {
        //todo: протестить метод

        var user = getCurrentUserFromContext();

        var addressesIds = userRepository.findAddressesIdByOwnershipId(user.getOwnershipId());

        if(!addressesIds.contains(createPollDto.getAddressId())){
            throw new IllegalArgumentException("Невозможно создать опрос по выбранному адресу!");
        }

        if(!(createPollDto.getPollValues().size() < 2)){
            throw new IllegalArgumentException("Минимальное число вариантов ответа: 2!");
        }

        if(createPollDto.getStartDate().before(createPollDto.getEndDate())){
            throw new IllegalArgumentException("Неверно указаны даты начала и завершения опроса!");
        }

        long duration = ChronoUnit.DAYS.between(
                (Temporal) createPollDto.getStartDate(), (Temporal) createPollDto.getEndDate());

        var pollValues = PollMapper.INSTANCE.toPollValues(createPollDto.getPollValues());

        Poll poll = pollRepository.save(
                Poll.builder()
                        .creatorUserId(user.getId())
                        .addressId(createPollDto.getAddressId())
                        .name(createPollDto.getName())
                        .startDate(createPollDto.getStartDate())
                        .endDate(createPollDto.getEndDate())
                        .duration((int) duration)
                        .status(planned)
                        .description(createPollDto.getDescription())
                        .cyclical(createPollDto.getCyclical())
                        .maxNumberAnswersByUser(createPollDto.getMaxNumberAnswersByUser())
                        .pollValues(pollValues)
                        .build()
        );

        return poll.getId();
    }
}
