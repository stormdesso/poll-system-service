package ru.pstu.poll_system_service.config;

import org.springframework.context.annotation.Import;
import ru.pstu.poll_system_service.web.config.SecurityConfig;
import ru.pstu.poll_system_service.web.config.SwaggerConfig;

@Import({SwaggerConfig.class, SecurityConfig.class})
public class ApplicationConfig{
}
