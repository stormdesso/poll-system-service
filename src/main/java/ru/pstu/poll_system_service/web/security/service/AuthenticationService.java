package ru.pstu.poll_system_service.web.security.service;

import ru.pstu.poll_system_service.web.security.model.AccountCredentials;
import ru.pstu.poll_system_service.web.security.model.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signIn(AccountCredentials request);

}
