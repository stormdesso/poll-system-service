package ru.pstu.poll_system_service.data.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.pstu.poll_system_service.data.mapper.FileMapper;
import ru.pstu.poll_system_service.data.model.FileEntity;
import ru.pstu.poll_system_service.data.repository.FileDbRepository;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.service.FileService;
import ru.pstu.poll_system_service.data.service.GeneralService;
import ru.pstu.poll_system_service.web.dto.FileDto;
import ru.pstu.poll_system_service.web.dto.FileInfoDto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

    private final FileDbRepository fileDbRepository;
    private final PollRepository pollRepository;
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

    @Override
    @Transactional
    public List<FileInfoDto> save(List<MultipartFile> files, Long pollId) {
        List<FileEntity> savedFiles = new ArrayList<>();

        files.forEach(file -> {
            try {
                String originalName = file.getOriginalFilename();
                byte[] data = file.getBytes();
                String type = file.getContentType() == null ? "unknown" : file.getContentType();
                String size = FileUtils.byteCountToDisplaySize(file.getSize());

                // Логирование данных перед созданием FileEntity
                log.info("Saving file: originalName={}, type={}, size={}", originalName, type, size);


                FileEntity fileEntity = FileEntity.builder()
                        .pollId(pollId)
                        .originalName(file.getOriginalFilename()) // надо убрать расширение
                        .data(file.getBytes())
                        .type(FilenameUtils.getExtension(file.getOriginalFilename() == null? "unknown":
                                FilenameUtils.getExtension(file.getOriginalFilename())))
                        .size(FileUtils.byteCountToDisplaySize(file.getSize()))
                        .build();
                savedFiles.add(fileDbRepository.save(fileEntity));
            } catch (IOException e) {
                log.error("Ошибка при сохранении файла: {}", e.getMessage());
            }
        });

        return FileMapper.INSTANCE.toFileInfoDtos(savedFiles);
    }

    @Override
    @Transactional
    public void delete (List<Long> filesIds){
        var files = fileDbRepository.findFileEntitiesByIdIsIn(filesIds);
        generalService.hasAccessToPolls(files.stream().map(FileEntity::getPollId).collect(Collectors.toList()));
        fileDbRepository.deleteAllById(filesIds);
    }
}
