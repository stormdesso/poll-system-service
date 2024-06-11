package ru.pstu.poll_system_service.business.service;

import org.jetbrains.annotations.NotNull;
import ru.pstu.poll_system_service.data.model.Poll;

import java.time.Duration;
import java.util.Date;

public interface ScheduledTaskService {
    void createTask(@NotNull Poll poll, Runnable task, @NotNull Date startDate, Duration duration);

    void rescheduleTaskFromTemplate(Poll poll);

    void createTaskFromTemplate(Poll poll);

    void cancelTask(Long pollId);
}
