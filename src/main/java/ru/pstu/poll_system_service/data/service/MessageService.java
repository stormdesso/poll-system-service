package ru.pstu.poll_system_service.data.service;

import ru.pstu.poll_system_service.web.dto.MessageDto;

import java.util.List;

public interface MessageService{
    List<MessageDto> getMessages(Long pollId);
}
