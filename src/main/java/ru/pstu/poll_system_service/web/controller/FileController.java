package ru.pstu.poll_system_service.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.pstu.poll_system_service.business.aspect.HasPermission;
import ru.pstu.poll_system_service.data.service.FileService;
import ru.pstu.poll_system_service.web.dto.FileInfoDto;

import java.io.IOException;
import java.util.List;

import static ru.pstu.poll_system_service.web.security.constant.ActionConstants.READ;
import static ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants.POLL;

@Controller
@RequestMapping("/api/v1/file")
@RequiredArgsConstructor
@Slf4j
public class FileController{

    private final FileService fileService;

    @Operation(description = "Получить информацию о файлах, связанных с опросом (название, тип, вес)")
    @HasPermission(resource = POLL, action = READ)
    @ResponseBody
    @GetMapping
    public List<FileInfoDto> getFilesInfoByPollId(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId
    ){
        return fileService.getFilesInfosByPollId(pollId);
    }

    @Operation(description = "Скачать файлы, связанные с опросом")
    @ResponseBody
    @PostMapping("/download_list")
    public void downloadFilesList(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId,
            @Parameter(description = "Список идентификаторов файлов")
            @RequestBody(required = true) List<Long> ids
    ){
        fileService.getFilesListByPollId(pollId, ids);
    }

    @PostMapping("/upload")
    public ResponseEntity<List<FileInfoDto>> upload(
            @RequestParam(required = true) List<MultipartFile> files,
            @RequestParam(required = true) Long pollId) {

        try {
            var list = fileService.save(files, pollId);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (IOException e) {
            log.error("Ошибка при попытке сохранить файл :{}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
