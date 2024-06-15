package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

/**
 Вариант опроса
 * */
@Data
@Schema(description = "Вариант ответа опроса")
@Builder
public class PollValueDto{

    @Schema(description = "Идентификатор варианта ответа")
    private Long id;

    @Schema(description = "Значение варианта ответа")
    @Size(max = 50, message = "Значение слишком длинное")
    private String value;

    @Schema(description = "Количество проголосовавших за этот вариант ответа")
    private Long votes;
}
