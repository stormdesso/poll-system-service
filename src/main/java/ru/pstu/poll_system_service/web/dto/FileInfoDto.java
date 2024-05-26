package ru.pstu.poll_system_service.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Информация о прикреплённом файле к опросу")
public class FileInfoDto{
    @Schema(description = "Идентификатор файла")
    private Long id;

    @Schema(description = "Название файла")
    private String originalName;

    @Schema(description = "Тип файла")
    private String type;
}
