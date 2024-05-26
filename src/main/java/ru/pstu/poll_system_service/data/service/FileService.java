package ru.pstu.poll_system_service.data.service;

import org.springframework.web.multipart.MultipartFile;
import ru.pstu.poll_system_service.web.dto.FileDto;
import ru.pstu.poll_system_service.web.dto.FileInfoDto;

import java.io.IOException;
import java.util.List;

public interface FileService{
    List<FileInfoDto> getFilesInfosByPollId(Long pollId);
    List<FileDto> getFilesListByPollId(Long pollId, List<Long> filesIds);
    List<FileInfoDto> save(List<MultipartFile> files, Long pollId) throws IOException;
}
