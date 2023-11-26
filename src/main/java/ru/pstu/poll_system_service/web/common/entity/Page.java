package ru.pstu.poll_system_service.web.common.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Schema(
        description = "Страница отфильтрованного списка"
)
@Data
@RequiredArgsConstructor
public class Page<T> {
    @Schema(description = "Элементы")
    private List<T> items;

    @Schema(description = "Количество элементов")
    private Long totalCount;

    @Schema(description = "Количество отфильтрованных элементов")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long filteredCount;
}
