package ru.pstu.poll_system_service.data.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.business.model.PollSchedule;
import ru.pstu.poll_system_service.business.model.ScheduleType;
import ru.pstu.poll_system_service.data.enums.StatusEnum;
import ru.pstu.poll_system_service.data.mapper.PollMapper;
import ru.pstu.poll_system_service.data.model.Poll;
import ru.pstu.poll_system_service.data.model.PollValue;
import ru.pstu.poll_system_service.data.model.UserAnswer;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.repository.user.UserAnswerRepository;
import ru.pstu.poll_system_service.data.repository.user.UserRepository;
import ru.pstu.poll_system_service.data.service.GeneralService;
import ru.pstu.poll_system_service.data.service.PollService;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.CreatePollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import static ru.pstu.poll_system_service.data.enums.RoleEnum.admin;
import static ru.pstu.poll_system_service.data.enums.RoleEnum.root;
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

        return getPollDtoPage(pollFilter, pageable, ids);
    }

    @Override
    public Page<PollDto> getFilteredSuggestedPolls(PollFilter pollFilter){
        Long ownershipId = getCurrentUserFromContext().getOwnershipId();

        Pageable pageable = PageRequest.of( pollFilter.getPage().intValue(), pollFilter.getLimit().intValue(),
                getSort(pollFilter.getSortableField(), pollFilter.getDirection()) );

        var ids = pollRepository.findSuggestedPollsIdsForUser(ownershipId, getCurrentUserIdFromContext());

        return getPollDtoPage(pollFilter, pageable, ids);
    }

    @NotNull
    private Page<PollDto> getPollDtoPage(PollFilter pollFilter, Pageable pageable, List<Long> ids) {
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
                    var type = pollEntitiesPage.stream()
                            .filter(pollDto -> pollDto.getId().equals(pd.getId()))
                            .toList().getFirst().getSchedule().getType();

                    pd.setType(type);
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

        if(pollValueDtosIds.stream().distinct().count() != pollValueDtoList.size()){
            throw new IllegalArgumentException("Нельзя проголосовать за один вариант ответа более 1 раза!");
        }

        log.debug("Все проверки пройдены");

        var list = pollValueDtoList.stream().map(pollValueDto -> UserAnswer.builder()
                .userId(userId)
                .pollValueId(pollValueDto.getId())
                .build()).collect(Collectors.toCollection(ArrayList::new));

        userAnswerRepository.saveAll(list);
    }

    @Override
    @Transactional
    public Poll save(CreatePollDto createPollDto) {
        var user = getCurrentUserFromContext();

        List<PollValueDto> tempValueDtoList = createPollDto.getPollValues().stream().map(str ->
                        PollValueDto.builder()
                                .value(str)
                                .build())
                .toList();

        validatePoll(createPollDto.getAddressId(), tempValueDtoList,
                createPollDto.getStartDate(), createPollDto.getEndDate());

        long duration = getDuration(createPollDto.getStartDate(), createPollDto.getEndDate());

        var schedule = getSchedule(createPollDto.getScheduleType());


        Poll poll = Poll.builder()
                        .schedule(schedule)
                        .creatorUserId(user.getId())
                        .addressId(createPollDto.getAddressId())
                        .name(createPollDto.getName())
                        .startDate(createPollDto.getStartDate())
                        .endDate(createPollDto.getEndDate())
                        .duration((int) duration)
                        .status(StatusEnum.proposed.name())
                        .description(createPollDto.getDescription())
                        .cyclical(createPollDto.getCyclical())
                        .maxNumberAnswersByUser(createPollDto.getMaxNumberAnswersByUser())
                        .pollValues(null) //инициализируется ниже
                        .build();

        List<PollValue> valuesDtoList = createPollDto.getPollValues().stream().map(str ->
                PollValue.builder()
                        .poll(poll)
                        .value(str)
                        .votes(0L)
                        .build())
                .toList();

        poll.setPollValues(valuesDtoList);

        return pollRepository.save(poll);
    }

    private long getDuration(Date startDate, Date endDate) {
        return ChronoUnit.DAYS.between(
                startDate.toInstant(),
                endDate.toInstant());
    }

    private void validatePoll(Long addressIdFromPoll, List<PollValueDto> pollValues, Date startDate, Date endDate) {
        var addressesIds = userRepository.findAddressesIdByOwnershipId(getCurrentUserFromContext().getOwnershipId());

        if(!addressesIds.contains(addressIdFromPoll)){
            throw new IllegalArgumentException("Нет доступа к адресу!");
        }

        if((pollValues.size() < 2)){
            throw new IllegalArgumentException("Минимальное число вариантов ответа: 2!");
        }

        if(startDate.after(endDate)){
            throw new IllegalArgumentException("Неверно указаны даты начала и завершения опроса!");
        }
    }

    @Override
    @Transactional
    public Poll update(PollDto pollDto) {
        var user = getCurrentUserFromContext();
        var roles = getCurrentUserFromContext().getRole().stream().map(Role::getRoleName).collect(Collectors.toSet());

        Poll originalEntity = pollRepository.findById(pollDto.getId()).orElseThrow(()
                -> new IllegalArgumentException("Указан неверный идентификатор опроса!"));

        if (!(StatusEnum.valueOf(StatusEnum.class, originalEntity.getStatus()).equals(StatusEnum.proposed) ||
                StatusEnum.valueOf(StatusEnum.class, originalEntity.getStatus()).equals(StatusEnum.returned))) {
            throw new IllegalArgumentException("Невозможно редактировать опрос!");
        }

        if (!(originalEntity.getCreatorUserId().equals(getCurrentUserIdFromContext()) ||
                roles.contains(admin.name()) || roles.contains(root.name()))) {
            throw new IllegalArgumentException("Нет прав на редактирование опроса!");
        }

        validatePoll(originalEntity.getAddressId(), pollDto.getPollValues(),
                pollDto.getStartDate(), pollDto.getEndDate());

        long duration = getDuration(pollDto.getStartDate(), pollDto.getEndDate());

        var schedule = getSchedule(pollDto.getType());

        Poll poll = Poll.builder()
                .id(pollDto.getId())
                .schedule(schedule)
                .creatorUserId(user.getId())
                .addressId(originalEntity.getAddressId())
                .name(pollDto.getName())
                .startDate(pollDto.getStartDate())
                .endDate(pollDto.getEndDate())
                .duration((int) duration)
                .status(pollDto.getStatus())
                .description(pollDto.getDescription())
                .cyclical(pollDto.isCyclical())
                .maxNumberAnswersByUser(pollDto.getMaxNumberAnswersByUser())
                .pollValues(null) //инициализируется ниже
                .build();

        List<PollValue> valuesDtoList = pollDto.getPollValues().stream().map(valueDto ->
                        PollValue.builder()
                                .id(valueDto.getId() == null? null: valueDto.getId())
                                .poll(poll)
                                .value(valueDto.getValue())
                                .votes(0L)
                                .build())
                .toList();

        poll.setPollValues(valuesDtoList);

        return pollRepository.save(poll);
    }

    private PollSchedule getSchedule(ScheduleType pollDto) {
        var allSchedule = pollRepository.findAllSchedule();
        return allSchedule.stream().filter(pollSchedule ->
                pollDto.equals(pollSchedule.getType())).toList().getFirst();
    }
}
