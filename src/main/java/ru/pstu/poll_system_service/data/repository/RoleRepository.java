package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.pstu.poll_system_service.data.model.user.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
