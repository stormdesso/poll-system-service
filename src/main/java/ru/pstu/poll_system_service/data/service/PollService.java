package ru.pstu.poll_system_service.data.service;

import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.CreatePollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

import java.util.List;

public interface PollService{
    Page<PollDto> getFilteredPolls(PollFilter pollFilter);

    Page<PollDto> getFilteredSuggestedPolls(PollFilter pollFilter);

    void vote(Long pollId, List<PollValueDto> pollValueDto);

    Long save(CreatePollDto createPollDto);
    Long update(PollDto pollDto);
}
