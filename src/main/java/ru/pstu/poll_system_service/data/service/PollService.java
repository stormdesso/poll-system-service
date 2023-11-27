package ru.pstu.poll_system_service.data.service;

import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.PollDto;

public interface PollService{
    Page<PollDto> getFilteredPolls(String sortingField, Long limit,Long page);
}
