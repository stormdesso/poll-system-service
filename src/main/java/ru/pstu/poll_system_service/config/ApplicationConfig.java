package ru.pstu.poll_system_service.config;

import org.springframework.context.annotation.Import;
import ru.pstu.poll_system_service.web.config.SecurityConfig;
import ru.pstu.poll_system_service.web.config.SwaggerConfig;
import ru.pstu.poll_system_service.web.config.WebSocketConfig;

@Import({SwaggerConfig.class, SecurityConfig.class, WebSocketConfig.class})
public class ApplicationConfig{
}
