package ru.pstu.poll_system_service.data.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.pstu.poll_system_service.data.mapper.FileMapper;
import ru.pstu.poll_system_service.data.model.FileEntity;
import ru.pstu.poll_system_service.data.repository.FileDbRepository;
import ru.pstu.poll_system_service.data.service.FileService;
import ru.pstu.poll_system_service.data.service.GeneralService;
import ru.pstu.poll_system_service.web.dto.FileDto;
import ru.pstu.poll_system_service.web.dto.FileInfoDto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

    private final FileDbRepository fileDbRepository;
    private final GeneralService generalService;

    @Override
    public List<FileInfoDto> getFilesInfosByPollId(Long pollId){
        generalService.hasAccessToPoll(pollId);
        return FileMapper.INSTANCE.toFileInfoDtos(fileDbRepository.findByPollId(pollId));
    }

    @Override
    public List<FileDto> getFilesListByPollId(Long pollId,List<Long> requestedFilesIds){
        var availableFilesIds = fileDbRepository.getFilesIdsByPollId(pollId);
        var resultSet = new HashSet<Long>(availableFilesIds);
        resultSet.retainAll(requestedFilesIds);
//        availableFilesIds.forEach( fileId -> {
//            if (requestedFilesIds.contains(fileId)){
//                resultSet.add(fileId);
//            }
//        });
        //скачиваем все файлы из списка, которые есть в запрашиваемом списке
        var files = fileDbRepository.findByIdIn(resultSet);
        return FileMapper.INSTANCE.toFileDtos(files);
    }

    @Transactional
    public List<FileInfoDto> save(List<MultipartFile> files, Long pollId) {
        List<FileEntity> savedFiles = new ArrayList<>();

        files.forEach(file -> {
            try {
                FileEntity fileEntity = FileEntity.builder()
                        .pollId(pollId)
                        .originalName(file.getName())
                        .data(file.getBytes())
                        .type(file.getContentType() == null? "unknown": file.getContentType())
                        .build();
                savedFiles.add(fileDbRepository.save(fileEntity));
            } catch (IOException e) {
                log.error("Ошибка при сохранении файла: {}", e.getMessage());
            }
        });

        return FileMapper.INSTANCE.toFileInfoDtos(savedFiles);
    }

}
