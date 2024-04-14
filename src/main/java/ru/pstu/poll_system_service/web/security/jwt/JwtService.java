package ru.pstu.poll_system_service.web.security.jwt;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.UserDetails;
public interface JwtService {
    String extractLogin(String token);

    String generateToken(UserDetails userDetails);
    String addAuthentication(UserDetails userDetails, HttpServletResponse response);

    boolean isTokenValid(String token, UserDetails userDetails);
}
