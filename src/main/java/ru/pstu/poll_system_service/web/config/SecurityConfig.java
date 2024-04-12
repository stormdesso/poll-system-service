package ru.pstu.poll_system_service.web.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ru.pstu.poll_system_service.web.jwt.AuthProvider;
import ru.pstu.poll_system_service.web.jwt.JWTLoginFilter;

import java.util.Collections;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig{

    private AuthenticationProvider authenticationProvider;
    private static final String LOGIN_URL = "/login";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> auth
                        .requestMatchers(GET, getSwaggerPatterns()).permitAll()
                        .requestMatchers(POST, LOGIN_URL).permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JWTLoginFilter(LOGIN_URL, authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public ProviderManager authenticationManager() {
        return new ProviderManager(Collections.singletonList(authenticationProvider));
    }

    @Lazy
    @Autowired
    @Qualifier("AuthProvider")
    public void setAuthenticationProvider(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    @Bean("AuthProvider")
    public AuthProvider authenticationProvider(UserDetailsService userDetailsService) {
        var provider = new AuthProvider();
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }


    private static String[] getSwaggerPatterns() {
        return new String[] {
                "/swagger-ui.html",
                "/swagger-ui.html/**",
                "/swagger-ui",
                "/swagger-ui/**",
                "/v3/api-docs",
                "/v3/api-docs/**",
        };
    }

}
