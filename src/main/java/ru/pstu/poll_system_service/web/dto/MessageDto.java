package ru.pstu.poll_system_service.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
@Data
@Schema(description = "Сообщение")
public class MessageDto{

    @Schema(description = "Идентификатор пользователя")
    private Long userId;

    @Schema(description = "Дата отправки сообщения")
    private Date dateSentMessage;

    @Schema(description = "Текст сообщения")
    private String message;

}
