package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
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
    private String description;

    @Schema(description = "Признак проголосовал ли пользователь, который запрашивал опрос")
    private boolean userIsVoted; //todo: как прикручу Security, промаппить поле

    @Schema(description = "Варианты ответов")
    private List<PollValueDto> pollValues;
}
