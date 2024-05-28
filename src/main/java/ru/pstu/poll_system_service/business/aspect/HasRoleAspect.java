package ru.pstu.poll_system_service.business.aspect;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.web.common.UserDetailsUtil;

@Aspect
@Component
@Slf4j
@RequiredArgsConstructor
public class HasRoleAspect {

    @Around("@annotation(hasRole)")
    public Object aroundHasRole(ProceedingJoinPoint joinPoint,HasRole hasRole) throws Throwable {
        if (!hasRole(hasRole)) {
            log.error("Недостаточно доступа, необходимая роль: {}", hasRole.role());
            throw new AccessDeniedException("Нет доступа");
        }
        return joinPoint.proceed();
    }

    private boolean hasRole(HasRole hasRole) {
        var roles = UserDetailsUtil.getCurrentUserFromContext().getRole().stream().map(Role::getRoleName).toList();
        return roles.contains(hasRole.role());
    }

}
