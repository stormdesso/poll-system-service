package ru.pstu.poll_system_service.data.service;

import ru.pstu.poll_system_service.web.dto.MessageDto;

import java.time.ZoneId;
import java.util.List;

public interface MessageService{
    List<MessageDto> getAllByPollId(Long pollId, ZoneId timeZone);
    void save(Long pollId, MessageDto messageDto);
}
