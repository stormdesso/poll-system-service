package ru.pstu.poll_system_service.web.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Greeting {
    private String content;

    public Greeting(String content) {
        this.content = content;
    }
}
