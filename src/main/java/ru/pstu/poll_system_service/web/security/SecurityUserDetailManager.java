package ru.pstu.poll_system_service.web.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;
import ru.pstu.poll_system_service.data.model.User;
import ru.pstu.poll_system_service.data.service.UserService;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class SecurityUserDetailManager implements UserDetailsManager{

    private final UserService userService;

    @Override
    public void createUser(UserDetails user){

    }

    @Override
    public void updateUser(UserDetails user){

    }

    @Override
    public void deleteUser(String username){

    }

    @Override
    public void changePassword(String oldPassword,String newPassword){

    }

    @Override
    public boolean userExists(String username){
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException{
        User user = userService.findByUsername(login);
        return new SecurityUser(user, Collections.emptyList());
    }
}
