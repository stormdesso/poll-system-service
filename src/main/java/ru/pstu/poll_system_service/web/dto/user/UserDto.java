package ru.pstu.poll_system_service.web.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Schema(description = "Пользователь")
public class UserDto {

    Long id;

    String fullName;

    Date birthdate;

    String login;

    String phoneNumber;

    String email;

    boolean isBlocked;

    @Schema(description = "Адреса пользователя")
    List<AddressInfo> addressInfos;

    @Schema(description = "Роли пользователя")
    List<String> roles;
}
