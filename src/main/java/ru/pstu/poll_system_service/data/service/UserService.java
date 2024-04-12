package ru.pstu.poll_system_service.data.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.pstu.poll_system_service.data.model.User;

public interface UserService{

    User findByUsername(String username);



}
