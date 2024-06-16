package ru.pstu.poll_system_service.business.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.pstu.poll_system_service.business.aspect.HasPermission;
import ru.pstu.poll_system_service.business.dto.RelocationRequestDto;
import ru.pstu.poll_system_service.business.service.AddressService;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction;
import ru.pstu.poll_system_service.web.dto.user.AddressInfo;

import java.util.List;

import static ru.pstu.poll_system_service.web.security.constant.ActionConstants.*;
import static ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants.RELOCATION;

@RequestMapping("/api/v1/relocation")
@Slf4j
@Controller
@RequiredArgsConstructor
@Validated
public class RelocationController {

    private final AddressService addressService;

    @Operation(description = "Отправить запрос на добавление нового адреса")
    @HasPermission(resource = RELOCATION, action = WRITE)
    @ResponseBody
    @PutMapping("/address/add")
    public void add(
            @Parameter(description = "Адрес")
            @RequestBody(required = true) @Valid AddressInfo addressInfo) {
        addressService.add(addressInfo);
    }

    @Operation(description = "Отправить запрос на удаление адреса")
    @HasPermission(resource = RELOCATION, action = WRITE)
    @ResponseBody
    @PutMapping("/address/delete")
    public void delete(
            @Parameter(description = "Адрес")
            @RequestBody(required = true) @Valid AddressInfo addressInfo) {
        addressService.delete(addressInfo.getId(), addressInfo.getApartmentNumber());
    }

    @Operation(description = "Отклонить запрос на добавление/удаление адреса")
    @HasPermission(resource = RELOCATION, action = DELETE)
    @ResponseBody
    @DeleteMapping("/request/deny")
    public void deny(
            @Parameter(description = "Адрес (id - можно не заполнять)")
            @RequestBody(required = true) @Valid AddressInfo addressInfo,
            @RequestParam @Min(1) Long userId,
            @RequestParam RelocationAction relocationAction) {
        addressService.deny(addressInfo, userId, relocationAction);
    }

    @Operation(description = "Принять запрос на добавление/удаление адреса")
    @HasPermission(resource = RELOCATION, action = CREATE)
    @ResponseBody
    @PostMapping("/request/accept")
    public void accept(
            @Parameter(description = "Адрес (id - можно не заполнять)")
            @RequestBody(required = true) @Valid AddressInfo addressInfo,
            @RequestParam @Min(1) Long userId,
            @RequestParam RelocationAction relocationAction) {
        addressService.accept(addressInfo, userId, relocationAction);
    }

    @Operation(description = "Запросы на добавление/удаление адреса")
    @HasPermission(resource = RELOCATION, action = READ)
    @ResponseBody
    @PostMapping("/request/all")
    public List<RelocationRequestDto> findAll() {
        return addressService.findAll();
    }
}
