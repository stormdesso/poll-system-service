package ru.pstu.poll_system_service.data.service;

import jakarta.validation.constraints.Positive;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.pstu.poll_system_service.web.dto.user.UserDto;

import java.util.List;

public interface UserService{
    UserDetailsService userDetailsService();


    List<UserDto> findAllAvailableUsers(int page, int size);

    UserDto getAuthenticatedUserInfo();

    UserDto findUserById(@Positive Long userId);


    void editAuthenticatedUserInfo(UserDto userDto, String password);
    void editUsersInfos(List<UserDto> userDtos);


    void deleteAuthenticatedAccount();
    void deleteAccountsInfos(List<Long> usersIds);

    void save(@NotNull UserDto userDto, @NotNull String password);
}
