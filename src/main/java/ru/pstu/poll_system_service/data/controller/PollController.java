package ru.pstu.poll_system_service.data.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.pstu.poll_system_service.business.aspect.HasPermission;
import ru.pstu.poll_system_service.business.service.ScheduledTaskService;
import ru.pstu.poll_system_service.data.service.PollService;
import ru.pstu.poll_system_service.web.common.PairParameter;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.CreatePollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static ru.pstu.poll_system_service.web.security.constant.ActionConstants.*;
import static ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants.POLL;

@RequestMapping("/api/v1/poll")
@Controller
@RequiredArgsConstructor
public class PollController{

    private final PollService pollService;
    private final ScheduledTaskService scheduledTaskService;

    @Operation(description = "Получить отфильтрованный список опросов")
    @HasPermission(resource = POLL, action = READ)
    @ResponseBody
    @PostMapping(value = "/filtered_list", consumes = APPLICATION_JSON_VALUE)
    public Page<PollDto> getFilteredPolls(
            @Parameter(description = "Название поля по которому будет осуществляться сортировка(asc - default, desc -fieldName)")
            @RequestParam(required = false) String sort,
            @Parameter(description = "Количество результатов на странице")
            @RequestParam(required = false) Long limit,
            @Parameter(description = "Номер страницы с результатом")
            @RequestParam(required = false) Long page,
            @Parameter(description = "Параметры фильтрации")
            @RequestBody(required = false) List<PairParameter> filteredFieldsByValue){

        var parameters = filteredFieldsByValue.stream().collect(Collectors.toMap(
                PairParameter::getKey, PairParameter::getValue, (a, b) -> b));

        return pollService.getFilteredPolls(new PollFilter(sort, limit, page, parameters));
    }

    @Operation(description = "Получить отфильтрованный список предложенных пользователем опросов")
    @HasPermission(resource = POLL, action = READ)
    @ResponseBody
    @PostMapping(value = "/suggested_filtered_list", consumes = APPLICATION_JSON_VALUE)
    public Page<PollDto> getFilteredSuggestedPolls(
            @Parameter(description = "Название поля по которому будет осуществляться сортировка(asc - default, desc -fieldName)")
            @RequestParam(required = false) String sort,
            @Parameter(description = "Количество результатов на странице")
            @RequestParam(required = false) Long limit,
            @Parameter(description = "Номер страницы с результатом")
            @RequestParam(required = false) Long page,
            @Parameter(description = "Параметры фильтрации")
            @RequestBody(required = false) List<PairParameter> filteredFieldsByValue){

        var parameters = filteredFieldsByValue.stream().collect(Collectors.toMap(
                PairParameter::getKey, PairParameter::getValue, (a, b) -> b));

        return pollService.getFilteredSuggestedPolls(new PollFilter(sort, limit, page, parameters));
    }

    @Operation(description = "Проголосовать в опросе")
    @HasPermission(resource = POLL, action = WRITE)
    @ResponseBody
    @PostMapping("/vote")
    public void vote(
            @Parameter(description = "Идентификатор опроса") @RequestParam(required = true) Long pollId,
            @Parameter(description = "Вариант опроса") @RequestBody(required = true) List<PollValueDto> pollValueDto){
        pollService.vote(pollId, pollValueDto);
    }

    @Operation(description = "Создать опрос")
    @HasPermission(resource = POLL, action = CREATE)
    @ResponseBody
    @PutMapping("/create")
    public Long create(@Parameter(description = "Опрос") @RequestBody(required = true) CreatePollDto createPollDto) {
        var poll =   pollService.save(createPollDto);
        scheduledTaskService.createTaskFromTemplate(poll);
        return poll.getId();
    }

    @Operation(description = "Редактировать опрос(неактивный)")
    @HasPermission(resource = POLL, action = WRITE)
    @ResponseBody
    @PostMapping("/update")
    public Long update(@Parameter(description = "Опрос") @RequestBody(required = true) PollDto pollDto) {
        var poll = pollService.update(pollDto);
        scheduledTaskService.rescheduleTaskFromTemplate(poll);
        return poll.getId();
    }
}
