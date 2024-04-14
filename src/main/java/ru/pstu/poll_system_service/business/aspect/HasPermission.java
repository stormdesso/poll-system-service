package ru.pstu.poll_system_service.business.aspect;

import ru.pstu.poll_system_service.web.security.constant.ActionConstants;
import ru.pstu.poll_system_service.web.security.constant.SystemObjectConstants;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface HasPermission {
    SystemObjectConstants resource();
    ActionConstants action();
}
