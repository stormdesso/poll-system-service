package ru.pstu.poll_system_service.data.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.mapper.MessageMapper;
import ru.pstu.poll_system_service.data.model.Message;
import ru.pstu.poll_system_service.data.repository.MessageRepository;
import ru.pstu.poll_system_service.data.service.MessageService;
import ru.pstu.poll_system_service.web.dto.MessageDto;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;

    public List<MessageDto> getMessages(Long pollId){
        List<Message> messages = messageRepository.findByPollId(pollId).stream()
                .sorted(Comparator.comparing(Message::getDateSentMessage))
                .collect(Collectors.toList());

        return MessageMapper.INSTANCE.toMessageDtos(messages);
    }
}
