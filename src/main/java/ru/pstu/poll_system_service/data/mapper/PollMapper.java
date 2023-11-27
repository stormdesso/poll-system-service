package ru.pstu.poll_system_service.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.data.entity.Poll;
import ru.pstu.poll_system_service.web.dto.PollDto;

import java.util.List;

@Mapper
public interface PollMapper{
    PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);
    PollDto toPollDto(Poll poll);
    List<PollDto> toPollDtos(List<Poll> polls);
}
