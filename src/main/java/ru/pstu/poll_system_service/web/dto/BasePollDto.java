package ru.pstu.poll_system_service.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

@Data
public abstract class BasePollDto{

    @Schema(description = "Создатель опроса")
    private String creatorUserId; // anonymous

    @Schema(description = "Название опроса")
    private String name;

    private Date startDate;
    private Date endDate;

    private String status;

    @Schema(description = "Число проголосовавших в опросе")
    private Long numberVotes;

    @Schema(description = "Максимально возможное число проголосовавших в опросе")
    private Long maxNumberVoted;

}
