package ru.pstu.poll_system_service.business.service.impl;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.business.model.ScheduleType;
import ru.pstu.poll_system_service.data.enums.StatusEnum;
import ru.pstu.poll_system_service.data.model.Poll;
import ru.pstu.poll_system_service.data.repository.PollRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static ru.pstu.poll_system_service.data.enums.StatusEnum.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduledTaskServiceImpl implements ru.pstu.poll_system_service.business.service.ScheduledTaskService {

    private final PollRepository pollRepository;

    private final ThreadPoolTaskScheduler taskScheduler;

    private Map<Long, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();

    private boolean todayIsStartDate(Poll poll) {
        final var now = new Date();
        return poll.getStartDate().before(now) && poll.getEndDate().after(now);
    }

    private static long getDateDiff(@NotNull Date startDate, @NotNull Date endDate) {
        long diffInMillis = endDate.getTime() - startDate.getTime();
        return TimeUnit.DAYS.convert(diffInMillis, TimeUnit.DAYS);
    }

    private @NotNull Date calculateNextStartDate(LocalDate startDate, int duration) {
        LocalDate nextStartDate = startDate;

        // продолжаем вычисление следующей даты опроса до тех пор, пока она не станет будущей датой
        while (!nextStartDate.isAfter(LocalDate.now())) {
            nextStartDate = nextStartDate.plusDays(duration);
        }

        return Date.from(nextStartDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    /**
     * @param newStartDate дата старта нового опроса(уже рассчитанная)
     */
    private Date calculateNextEndDate(@NotNull LocalDate newStartDate, int duration) {
        return Date.from(newStartDate.plusDays(duration).atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    private LocalDate getLocalDateFrom(@NotNull Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    void logStatus(@NotNull Poll poll) {
        log.info("Опрос \"{}\" с id={} переведён в состояние:{}", poll.getName(), poll.getId(), poll.getStatus());
    }

    /**
     * Будет выполняться каждый день в 00:01
     */
    @Scheduled(cron = "0 1 0 * * ?")
    private void runDailyTask() {
        log.info("Запуск плановой задачи по переводу опросов в статус active/closed");
        updateStatus();
        log.info("Задание завершено");

        log.info("Запуск плановой задачи по удалению старых опросов");
        var allClosedPollsIds = pollRepository.findAllClosed();
        allClosedPollsIds.forEach(id -> {
            if (scheduledTasks.containsKey(id)) {
                cancelTask(id);
            }
        });
        pollRepository.deleteAllById(allClosedPollsIds);
        log.info("Задание завершено");
    }

    /**
     * Метод инициализирует отложенные задачи при старте приложения
     */
    @PostConstruct
    private void initTasks() {
        var polls = pollRepository.findAllActiveAndPlannedPollWithSchedule();

        polls.forEach(poll -> {
            var period = poll.getSchedule().getType().getCountDays();
            var startDate = calculateNextStartDate(getLocalDateFrom(poll.getStartDate()), period);

            createTask(poll, () -> this.recreate(poll), startDate, Duration.ofDays(period));
        });

    }

    private void updateStatus() {
        var allPolls = pollRepository.findAll();
        allPolls.forEach(poll -> {
            if (todayIsStartDate(poll) && poll.getStatus().equals(planned.name())) {
                poll.setStatus(active.name());
                logStatus(poll);
            }
            if (poll.getEndDate().before(new Date()) && poll.getStatus().equals(active.name())) {
                poll.setStatus(closed.name());
                logStatus(poll);
            }
        });
        pollRepository.saveAll(allPolls);
    }

    @Override
    public void createTask(@NotNull Poll poll, Runnable task, @NotNull Date startDate, Duration duration) {
        ScheduledFuture<?> scheduledTask = taskScheduler.scheduleAtFixedRate(task, startDate.toInstant(), duration);
        scheduledTasks.put(poll.getId(), scheduledTask);
    }


    public void createTaskFromTemplate(Poll poll) {
        if (!needTask(poll)) return;

        var period = poll.getSchedule().getType().getCountDays();
        var startDate = calculateNextStartDate(getLocalDateFrom(poll.getStartDate()), period);
        createTask(poll, () -> this.recreate(poll), startDate, Duration.ofDays(period));
    }

    public void rescheduleTaskFromTemplate(Poll poll) {
        if (!needTask(poll))
            return;

        var period = poll.getSchedule().getType().getCountDays();
        var startDate = calculateNextStartDate(getLocalDateFrom(poll.getStartDate()), period);
        cancelTask(poll.getId());
        createTask(poll, () -> this.recreate(poll), startDate, Duration.ofDays(period));
    }

    private boolean needTask(Poll poll) {
        return !(poll.getSchedule().getType().equals(ScheduleType.NO_SCHEDULE)
                || !StatusEnum.getWorkStatus().contains(poll.getStatus()));
    }

    private void recreate(@NotNull Poll poll) {
        var startDate = new Date();
        var endDate = calculateNextEndDate(LocalDate.from(startDate.toInstant()), poll.getDuration());
        var duration = getDateDiff(startDate, endDate);

        if (duration != poll.getDuration()) {
            log.info("Неверный рассчёт дат!");
            throw new IllegalArgumentException("Неверный рассчёт дат!");
        }

        var newPoll = poll.toBuilder()
                .id(null)
                .startDate(startDate)
                .status(active.name())
                .endDate(endDate)
                .build();

        pollRepository.save(newPoll);
    }

    @Override
    public void cancelTask(Long pollId) {
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(pollId);
        if (scheduledTask != null) {
            scheduledTask.cancel(false);
            scheduledTasks.remove(pollId);
        }
    }

}
