package ru.pstu.poll_system_service.web.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class SecurityUser extends User{

    private final ru.pstu.poll_system_service.data.model.User userData;

    public SecurityUser(ru.pstu.poll_system_service.data.model.User user,Collection<? extends GrantedAuthority> authorities) {
        super(user.getLogin(), user.getPassword(), true, true, true, !user.isBlocked(), authorities);
        this.userData = user;
    }
}
