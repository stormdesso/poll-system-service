package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import ru.pstu.poll_system_service.business.model.ScheduleType;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class CreatePollDto {

    @Schema(description = "Идентификатор адреса")
    private Long addressId;
    @Schema(description = "Циклический опрос")
    private Boolean cyclical;

    @Schema(description = "Описание")
    @Size(max = 1, message = "Описание слишком короткое")
    @Size(max = 1000, message = "Описание слишком длинное")
    private String description;

    @Schema(description = "Варианты ответов")
    private List<String> pollValues;

    @Schema(description = "Название опроса")
    private String name;

    @Schema(description = "Дата начала проведения")
    private Date startDate;

    @Schema(description = "Дата окончания")
    private Date endDate;

    @Schema(description = "Максимально возможное число голосов в опросе от одного пользователя")
    private Long maxNumberAnswersByUser;

    @Schema(description = "Тип расписания")
    private ScheduleType scheduleType;
}
