package ru.pstu.poll_system_service.data.enums;

import java.util.List;

public enum StatusEnum {
    proposed, 
    active,
    planned,
    closed,
    returned;

    public final static List<StatusEnum> UNAVAILABLE_STATUS = List.of(
            StatusEnum.closed,
            StatusEnum.planned,
            StatusEnum.proposed,
            StatusEnum.returned
    );
}
