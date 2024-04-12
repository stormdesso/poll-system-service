package ru.pstu.poll_system_service.data.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.model.User;
import ru.pstu.poll_system_service.data.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    @Override
    public User findByUsername(String login){
        return userRepository.findUserByLogin(login);
    }
}
