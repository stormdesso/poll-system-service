package ru.pstu.poll_system_service.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.data.model.Message;
import ru.pstu.poll_system_service.web.dto.MessageDto;

import java.util.List;

@Mapper
public interface MessageMapper{
    MessageMapper INSTANCE = Mappers.getMapper(MessageMapper.class);

    MessageDto toMessageDto(Message message);
    List<MessageDto> toMessageDtos(List<Message> messages);
}
