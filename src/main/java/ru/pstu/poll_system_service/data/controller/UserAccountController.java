package ru.pstu.poll_system_service.data.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    @Operation(description = "Получить информацию о доступных аккаунтах")
    @HasPermission(resource = USER_ADMINISTRATION, action = READ)
    @GetMapping("/all")
    public List<UserDto> findAccountsInfos(
            @Parameter(description = "Номер страницы")
            @RequestParam(required = true) @Min(0) int page,
            @Parameter(description = "Размер страницы")
            @RequestParam(required = true) @Min(1) int size) {
        return userService.findAllAvailableUsers(page, size);
    }

    @Operation(description = "Получить информацию о своём аккаунте")
    @GetMapping("/me")
    public UserDto getAccountInfo() {
        return userService.getAuthenticatedUserInfo();
    }

    @Operation(description = "Редактировать информацию о своём аккаунте")
    @PostMapping("/edit/me")
    public void editAccountInfo(@RequestBody UserDto userDto, @RequestParam(required = false) String password) {
        userService.editAuthenticatedUserInfo(
                userDto, password == null || password.isBlank()? null: passwordEncoder.encode(password) );
    }

    @Operation(description = "Редактировать информацию об аккаунтах пользователей")
    @PostMapping("/edit/users")
    public void editAccountsInfos(@RequestBody List<UserDto> userDtos) {
        userService.editUsersInfos(userDtos);
    }

    @Operation(description = "Удалить свой аккаунт")
    @DeleteMapping("/delete/me")
    public void deleteAccountInfo() {
        userService.deleteAuthenticatedAccount();
    }

    @Operation(description = "Удалить аккаунты пользователей")
    @DeleteMapping("/delete/users")
    public void deleteAccountsInfos(@RequestParam List<Long> usersIds) {
        userService.deleteAccountsInfos(usersIds);
    }
}
