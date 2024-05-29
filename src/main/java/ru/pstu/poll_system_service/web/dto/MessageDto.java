package ru.pstu.poll_system_service.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.ZonedDateTime;
@Data
@Schema(description = "Сообщение")
public class MessageDto{

    @Schema(description = "Идентификатор пользователя")
    private Long userId;

    @Schema(description = "Дата отправки сообщения")
    private ZonedDateTime dateSentMessage;

    @Schema(description = "Текст сообщения")
    @Size(min = 1, message = "Сообщение слишком короткое")
    @Size(max = 500, message = "Сообщение слишком длинное")
    private String message;

}
