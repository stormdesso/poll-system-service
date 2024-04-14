package ru.pstu.poll_system_service.business.aspect;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class HasPermissionAspect {
    private final PermissionEvaluator permissionEvaluator;

    @Around("@annotation(hasPermission)")
    public Object aroundHasPermission(ProceedingJoinPoint joinPoint,HasPermission hasPermission) throws Throwable {
        if (!hasPermission(hasPermission)) {
            throw new AccessDeniedException("Нет доступа");
        }

        return joinPoint.proceed();
    }

    private boolean hasPermission(HasPermission hasPermission) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return permissionEvaluator.hasPermission(authentication, hasPermission.resource().getId(), hasPermission.action().getId());
    }

}
