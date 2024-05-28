package ru.pstu.poll_system_service.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.pstu.poll_system_service.web.security.service.AuthenticationService;
import ru.pstu.poll_system_service.web.security.model.AccountCredentials;
import ru.pstu.poll_system_service.web.security.model.JwtAuthenticationResponse;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signin")
    public JwtAuthenticationResponse signIn(@RequestBody AccountCredentials request) {
        return authenticationService.signIn(request);
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody AccountCredentials request) {
        //todo: реализовать
        return null;
    }
}
