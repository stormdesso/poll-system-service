package ru.pstu.poll_system_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import ru.pstu.poll_system_service.web.config.SwaggerConfig;

@SpringBootApplication
@Import({SwaggerConfig.class})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
