package ru.pstu.poll_system_service.business.model;

import lombok.Getter;

@Getter
public enum ScheduleType {
    EVERY_MONTH("Every month", 30),
    EVERY_WEEK("Every week", 7),
    EVERY_YEAR("Every year", 365),
    NO_SCHEDULE("No schedule", 0);

    private final String type;
    private final int countDays;


    ScheduleType(String type, int countDays) {
        this.type = type;
        this.countDays = countDays;
    }

}
