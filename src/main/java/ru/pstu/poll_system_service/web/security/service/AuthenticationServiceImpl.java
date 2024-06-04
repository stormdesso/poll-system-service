package ru.pstu.poll_system_service.web.security.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.data.repository.UserRepository;
import ru.pstu.poll_system_service.web.security.jwt.JwtService;
import ru.pstu.poll_system_service.web.security.model.SecurityUser;
import ru.pstu.poll_system_service.web.security.model.AccountCredentials;
import ru.pstu.poll_system_service.web.security.model.JwtAuthenticationResponse;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final HttpServletResponse httpServletResponse;

    @Override
    public JwtAuthenticationResponse signIn(AccountCredentials request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));

        var user = userRepository.findUserByLogin(request.getLogin())
                .orElseThrow(() -> new AccessDeniedException("Неправильный login или пароль"));

        String jwt = jwtService.addAuthentication(new SecurityUser(user, Collections.emptyList()), httpServletResponse);

        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .role(user.getRole().stream().map(Role::getRoleName).toList())
                .build();
    }
}
