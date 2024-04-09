package ru.pstu.poll_system_service.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.pstu.poll_system_service.data.service.MessageService;
import ru.pstu.poll_system_service.data.service.PollService;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.MessageDto;
import ru.pstu.poll_system_service.web.dto.PollDto;
import ru.pstu.poll_system_service.web.dto.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.util.List;

@RequestMapping("/api/v1/poll")
@Controller
@RequiredArgsConstructor
public class PollController{

    private final PollService pollService;
    private final MessageService messageService;


    @Operation(description = "Получить отфильтрованный список опросов")
    @ResponseBody
    @GetMapping("/filtered_list")
    public Page<PollDto> getFilteredPolls(
            @Parameter(description = "Название поля по которому будет осуществляться сортировка(asc - default, desc -fieldName)")
            @RequestParam(required = false) String sort,
            @Parameter(description = "Количество результатов на странице")
            @RequestParam(required = false) Long limit,
            @Parameter(description = "Номер страницы с результатом") @RequestParam(required = false) Long page
    ){
        return pollService.getFilteredPolls(new PollFilter(sort, limit, page));
    }

    @Operation(description = "Получить список сообщений в чате опроса")
    @ResponseBody
    @GetMapping("/messages")
    public List<MessageDto> getMessages(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId
    ){
        return messageService.getMessages(pollId);
    }

    @Operation(description = "Отправить сообщение в чате опроса")
    @ResponseBody
    @PostMapping("/send_message")
    public void sendMessage(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId,
            @Parameter(description = "Сообщение")
            @RequestBody(required = true) MessageDto messageDto
    ){
        //todo: mock
    }

    @Operation(description = "Проголосовать в опросе")
    @ResponseBody
    @PostMapping("/vote")
    public void vote(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId,
            @Parameter(description = "Вариант опроса")
            @RequestBody(required = true) PollValueDto pollAnswerDto
    ){
        //todo: mock
    }
}
