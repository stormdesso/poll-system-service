package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

@Data
public abstract class BasePollDto{

    @Schema(description = "Создатель опроса")
    private Long creatorUserId;

    @Schema(description = "Название опроса")
    private String name;

    @Schema(description = "Дата начала проведения")
    private Date startDate;

    @Schema(description = "Дата окончания")
    private Date endDate;

    @Schema(description = "Статус")
    private String status;

    @Schema(description = "Число проголосовавших в опросе")
    private Long numberVotes;

    @Schema(description = "Максимально возможное число проголосовавших в опросе")
    private Long maxNumberVoted;

    @Schema(description = "Максимально возможное число голосов в опросе")
    private Long maxNumberAnswersByUser;
}
