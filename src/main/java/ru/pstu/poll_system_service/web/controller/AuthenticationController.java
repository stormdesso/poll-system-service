package ru.pstu.poll_system_service.web.controller;

import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.pstu.poll_system_service.data.service.UserService;
import ru.pstu.poll_system_service.web.dto.user.UserDto;
import ru.pstu.poll_system_service.web.security.model.AccountCredentials;
import ru.pstu.poll_system_service.web.security.model.JwtAuthenticationResponse;
import ru.pstu.poll_system_service.web.security.service.AuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public JwtAuthenticationResponse signIn(@RequestBody AccountCredentials request) {
        return authenticationService.signIn(request);
    }

    @PutMapping("/signup")
    public void signUp(@RequestBody UserDto userDto, @RequestParam(required = true) @NotEmpty String password) {
        userService.save(userDto, passwordEncoder.encode(password));
    }
}
