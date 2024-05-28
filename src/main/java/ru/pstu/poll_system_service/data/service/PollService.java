package ru.pstu.poll_system_service.data.service;

import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.poll.PollDto;
import ru.pstu.poll_system_service.web.dto.poll.PollValueDto;
import ru.pstu.poll_system_service.web.filter.PollFilter;

public interface PollService{
    Page<PollDto> getFilteredPollsForUser(PollFilter pollFilter);
    Page<PollDto> getFilteredPollsForAdmin(PollFilter pollFilter);

    void vote(Long pollId,  PollValueDto pollValueDto);
}
