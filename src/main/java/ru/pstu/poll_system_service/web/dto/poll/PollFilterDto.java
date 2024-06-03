package ru.pstu.poll_system_service.web.dto.poll;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.jetbrains.annotations.Nullable;

@Data
public class PollFilterDto {
    @Nullable
    @Schema(description = "Название поля по которому будет осуществляться сортировка(asc - default, desc -fieldName)")
    private String sort;

    @Nullable
    @Schema(description = "Количество результатов на странице")
    private Long limit;

    @Nullable
    @Schema(description = "Номер страницы с результатом")
    private Long page;

    @Nullable
    @Schema(description = "Фильтрация полей по значению")
    private String fieldValues;
}
