package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
* Полная информация по опросу
* */

@Getter
@Setter
@Schema(description = "Опрос")
public class PollDto extends BasePollDto{

    @Schema(description = "Идентификатор опроса")
    private Long id;

    @Schema(description = "Описание")
    @Size(max = 1, message = "Описание слишком короткое")
    @Size(max = 1000, message = "Описание слишком длинное")
    private String description;

    @Schema(description = "Признак проголосовал ли пользователь, который запрашивал опрос")
    private boolean userIsVoted;

    @Schema(description = "Варианты ответов")
    private List<PollValueDto> pollValues;

    @Schema(description = "Циклический опрос")
    private boolean cyclical;
}
