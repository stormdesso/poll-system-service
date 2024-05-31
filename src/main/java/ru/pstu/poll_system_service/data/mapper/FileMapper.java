package ru.pstu.poll_system_service.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.data.model.FileEntity;
import ru.pstu.poll_system_service.web.dto.FileDto;
import ru.pstu.poll_system_service.web.dto.FileInfoDto;

import java.util.List;
import java.util.Set;

@Mapper
public interface FileMapper{
    FileMapper INSTANCE = Mappers.getMapper(FileMapper.class);

    List<FileInfoDto> toFileInfoDtos(List<FileEntity> files);

    List<FileDto> toFileDtos(Set<FileEntity> files);

}
