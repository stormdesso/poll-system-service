package ru.pstu.poll_system_service.data.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.repository.UserRepository;
import ru.pstu.poll_system_service.web.security.model.SecurityUser;

import java.util.Collections;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                log.debug("Поиск пользователя с login:{} в базе", username);
                var user =  userRepository.findUserByLogin(username);
                if (user.isEmpty()){
                    throw new AccessDeniedException("Пользователь не найден");
                }
                return new SecurityUser(user.get(), Collections.emptyList());
            }
        };
    }
}
