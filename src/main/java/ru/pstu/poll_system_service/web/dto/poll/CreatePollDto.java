package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CreatePollDto extends BasePollDto {

    @Schema(description = "Идентификатор адреса")
    private Long addressId;
    @Schema(description = "Циклический опрос")
    private Boolean cyclical;

    @Schema(description = "Описание")
    @Size(max = 1, message = "Описание слишком короткое")
    @Size(max = 1000, message = "Описание слишком длинное")
    private String description;

    @Schema(description = "Варианты ответов")
    private List<PollValueDto> pollValues;
}
