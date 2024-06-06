package ru.pstu.poll_system_service.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.pstu.poll_system_service.business.aspect.HasPermission;
import ru.pstu.poll_system_service.data.service.UserService;
import ru.pstu.poll_system_service.web.dto.user.UserDto;

import java.util.List;

import static ru.pstu.poll_system_service.web.security.constant.ActionConstants.READ;
import static ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants.USER_ADMINISTRATION;

@RestController
@RequestMapping("/api/v1/user/account")
@RequiredArgsConstructor
public class UserAccountController {

    private final UserService userService;

    @Operation(description = "Получить информацию о доступных аккаунтах")
    @HasPermission(resource = USER_ADMINISTRATION, action = READ)
    @GetMapping("/all")
    public List<UserDto> findAccountsInfos() { //todo: исключить админов и рутов для админа
                                                //      исключить рутов для админов
        return userService.findAllAvailableUsers();
    }

    @Operation(description = "Получить информацию о своём аккаунте")
    @GetMapping("/me")
    public UserDto getAccountInfo() {
        return userService.getAuthenticatedUserInfo();
    }

    /*
    * Метод для редактирования своих данных (только валидация полей по типу:
    *  ФИО - буквы
    * Номер телефона без букв
    * Дата рождения меньше сегодняшней
    * Адрес электронной почты по regex(загуглить)
    * Пароль не пустой
    * Адрес может быть только из существующих
    * )
    * */

    /*
     * Метод для редактирования данных пользователей
     * 0)Проверить доступ к данным пользователей по их адресам
     * (адреса редактирующего, должны включать в себя все пришедшие адреса)
     * 1)Валидация
     * 2)НЕЛЬЗЯ РЕДАКТИРОВАТЬ АДМИНОВ И РУТОВ
     * */

}
