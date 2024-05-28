package ru.pstu.poll_system_service.web.common;

import org.springframework.security.core.context.SecurityContextHolder;
import ru.pstu.poll_system_service.data.model.User;
import ru.pstu.poll_system_service.web.security.model.SecurityUser;

public class UserDetailsUtil{
    public static Long getCurrentUserIdFromContext(){
        return ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserData().getId();
    }

    public static User getCurrentUserFromContext(){
        return ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserData();
    }
}
