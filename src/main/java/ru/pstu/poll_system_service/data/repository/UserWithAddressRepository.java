package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.user.UserWithAddress;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserWithAddressRepository extends JpaRepository<UserWithAddress, Long>, JpaSpecificationExecutor<UserWithAddress>{

    List<UserWithAddress> findAllByIdIn(Collection<Long> id);
    List<UserWithAddress> findAllByAddressIdIn(Collection<Long> id);
}
