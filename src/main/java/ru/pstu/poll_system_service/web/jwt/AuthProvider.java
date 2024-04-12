package ru.pstu.poll_system_service.web.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

@RequiredArgsConstructor
public class AuthProvider extends DaoAuthenticationProvider{

//    private final UserService userService;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException{
        String username = String.valueOf(authentication.getPrincipal());
//        User user = userService.findByUsername(username);

        return super.authenticate(authentication);
    }

}
