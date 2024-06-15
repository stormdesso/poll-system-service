package ru.pstu.poll_system_service.data.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.mapper.MessageMapper;
import ru.pstu.poll_system_service.data.model.Message;
import ru.pstu.poll_system_service.data.repository.MessageRepository;
import ru.pstu.poll_system_service.data.service.GeneralService;
import ru.pstu.poll_system_service.data.service.MessageService;
import ru.pstu.poll_system_service.web.dto.MessageDto;

import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final MessageRepository messageRepository;
    private final GeneralService generalService;

    public List<MessageDto> getAllByPollId(Long pollId, ZoneId timeZone){
        generalService.hasAccessToPolls(List.of(pollId));
        List<Message> messages = messageRepository.findByPollId(pollId).stream()
                .sorted(Comparator.comparing(Message::getDateSentMessage))
                .collect(Collectors.toList());

        List<MessageDto> messageDtos =  MessageMapper.INSTANCE.toMessageDtos(messages);
        messageDtos.forEach(m -> m.setDateSentMessage(m.getDateSentMessage().withZoneSameInstant(timeZone)));
        return messageDtos;
    }

    @Override
    public void save(Long pollId, MessageDto messageDto) {
        generalService.hasAccessToPolls(List.of(pollId));
        messageRepository.save(Message.builder()
                        .userId(getCurrentUserIdFromContext())
                        .pollId(pollId)
                        .dateSentMessage(messageDto.getDateSentMessage())
                        .message(messageDto.getMessage())
                .build());
    }
}
