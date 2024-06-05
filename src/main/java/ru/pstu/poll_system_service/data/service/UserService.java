package ru.pstu.poll_system_service.data.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.pstu.poll_system_service.web.dto.user.UserDto;

import java.util.List;

public interface UserService{
    UserDetailsService userDetailsService();
    List<UserDto> findAllAvailableUsers();

    UserDto getAuthenticatedUserInfo();
}
