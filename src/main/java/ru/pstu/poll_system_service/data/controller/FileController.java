package ru.pstu.poll_system_service.data.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.pstu.poll_system_service.business.aspect.HasPermission;
import ru.pstu.poll_system_service.data.service.FileService;
import ru.pstu.poll_system_service.web.dto.FileDto;
import ru.pstu.poll_system_service.web.dto.FileInfoDto;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;
import static ru.pstu.poll_system_service.web.security.constant.ActionConstants.*;
import static ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants.POLL;

@RestController
@RequestMapping("/api/v1/file")
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileService fileService;

    @Operation(description = "Получить информацию о файлах, связанных с опросом (название, тип, вес)")
    @HasPermission(resource = POLL, action = READ)
    @ResponseBody
    @GetMapping
    public List<FileInfoDto> getFilesInfoByPollId(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId) {
        return fileService.getFilesInfosByPollId(pollId);
    }

    @Operation(description = "Скачать файлы, связанные с опросом")
    @HasPermission(resource = POLL, action = READ)
    @ResponseBody
    @PostMapping(value = "/download_list", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FileDto>> downloadFilesList(
            @Parameter(description = "Идентификатор опроса")
            @RequestParam(required = true) Long pollId,
            @Parameter(description = "Список идентификаторов файлов")
            @RequestParam(required = true) List<Long> ids) {
        return new ResponseEntity<>(fileService.getFilesListByPollId(pollId, ids), OK);
    }

    @Operation(description = "Загрузить файлы на сервер")
    @HasPermission(resource = POLL, action = CREATE)
    @ResponseBody
    @PostMapping(value = "/upload", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<FileInfoDto>> upload(
            @RequestBody MultipartFile[] files,
            @RequestParam(required = true) Long pollId) {
        try {
            var savedFilesInfos = fileService.save(List.of(files), pollId);
            return new ResponseEntity<>(savedFilesInfos, OK);
        } catch (IOException e) {
            log.error("Ошибка при попытке сохранить файл :{}", e.getMessage());
            return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Удалить файлы по id")
    @HasPermission(resource = POLL, action = DELETE)
    @ResponseBody
    @DeleteMapping(value = "/delete")
    public void delete(@Parameter(description = "Идентификаторы файлов")
                           @RequestParam(required = true) List<Long> ids) {
        fileService.delete(ids);
    }

}
