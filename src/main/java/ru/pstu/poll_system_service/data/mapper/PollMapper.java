package ru.pstu.poll_system_service.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.data.model.Poll;
import ru.pstu.poll_system_service.data.model.PollValue;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;

import java.util.List;

@Mapper
public interface PollMapper{
    PollMapper INSTANCE = Mappers.getMapper(PollMapper.class);

    PollDto toPollDto(Poll poll);

    List<PollDto> toPollDtos(List<Poll> polls);

    List<PollValue> toPollValues(List<PollValueDto> pollValueDto);
}
