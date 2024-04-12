package ru.pstu.poll_system_service.web.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenAuthenticationService{
    private static final String SECRET = "Secret";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 дней
    private static final String TOKEN_PREFIX = "Bearer";
    private static final String HEADERS_STRING = "Authorization";

    static void addAuthentication(HttpServletResponse response, String login){
        response.addHeader(HEADERS_STRING, TOKEN_PREFIX + " " + generateToken(login));
    }

    private static String generateToken(String login){
        return Jwts.builder()
                .subject(login)
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

}
