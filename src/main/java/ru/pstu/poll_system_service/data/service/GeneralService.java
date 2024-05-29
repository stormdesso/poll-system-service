package ru.pstu.poll_system_service.data.service;

import java.util.List;

public interface GeneralService{
    void hasAccessToPolls(List<Long> ids);
}
