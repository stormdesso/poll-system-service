package ru.pstu.poll_system_service.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;
import ru.pstu.poll_system_service.business.aspect.HasPermission;
import ru.pstu.poll_system_service.data.service.MessageService;
import ru.pstu.poll_system_service.web.dto.MessageDto;

import java.time.ZoneId;
import java.util.List;

import static ru.pstu.poll_system_service.web.security.constant.ActionConstants.READ;
import static ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants.POLL;

@RequestMapping("/api/v1/poll/chat")
@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    private final MessageService messageService;

    @Operation(description = "Получить список сообщений в чате опроса")
    @HasPermission(resource = POLL, action = READ)
    @ResponseBody
    @GetMapping("/messages")
    public List<MessageDto> getMessages(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId,
            @Parameter(description = "Часовой пояс получающего")
            @RequestParam(required = true) String timeZone){
        return messageService.getAllByPollId(pollId, ZoneId.of(timeZone));
    }
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) {
        log.error("Сообщение получено:{}", message.getName());
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    /**
     *Сохраняет сообщение на сервер, далее отправляет в очередь
     * для получения сообщения необходимо подключиться к сокету,
     * далее подписаться на очередь по url: /api/v1/poll/chat/{pollId}/new_messages
     * */
//    @Operation(description = "Отправить сообщение в чате опроса")
////    @HasPermission(resource = POLL, action = CREATE)
////    @ResponseBody
//    @MessageMapping("/send")
//    public void sendMessage(
//            @Payload @Parameter(description = "Идентификатор опроса")
//            @RequestParam(required = true) Long pollId,
//            @Payload @Parameter(description = "Сообщение")
//            @RequestBody(required = true) MessageDto messageDto){
//        log.debug("Пользователь: {} отправил сообщение в чате: {}",
//                messageDto.getUserId(), messageDto.getMessage());
//
//        messageService.save(pollId, messageDto);
//
//        //отправляем сообщение в очередь -> получают все подписчики
//        messagingTemplate.convertAndSendToUser(pollId.toString(),"/new_messages", messageDto);
//        //подписываться необходимо на /api/v1/poll/chat/{pollId}/new_messages
//    }
}
