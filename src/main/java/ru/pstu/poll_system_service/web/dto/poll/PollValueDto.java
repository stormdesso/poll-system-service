package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 Вариант опроса
 * */
@Data
@Schema(description = "Вариант ответа опроса")
public class PollValueDto{

    @Schema(description = "Идентификатор варианта ответа")
    private Long id;

    @Schema(description = "Значение варианта ответа")
    private String value;

    @Schema(description = "Количество проголосовавших за этот вариант ответа")
    private Long votes;
}
