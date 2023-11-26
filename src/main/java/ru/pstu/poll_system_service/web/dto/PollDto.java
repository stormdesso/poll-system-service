package ru.pstu.poll_system_service.web.dto;

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

    private String description;

    private boolean userIsVoted;
    private List<PollAnswerDto> pollAnswerDto;
}
