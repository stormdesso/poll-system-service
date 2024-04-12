package ru.pstu.poll_system_service.web.jwt;

import lombok.Getter;

@Getter
public class AccountCredentials{
    private String login;
    private String password;
}
