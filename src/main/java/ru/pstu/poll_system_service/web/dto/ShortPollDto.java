package ru.pstu.poll_system_service.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
* Краткая информация по опросу
* */

@Schema(description = "Краткий опрос")
public class ShortPollDto extends BasePollDto{
    private Long id;
}
