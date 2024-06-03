package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User>{
    Optional<User> findUserByLogin(String login);

    /**
     Поиск адресов пользователя по ownership id
    */
    @Query(value = "select * from address_ownership where ownership_id = :ownershipId", nativeQuery = true)
    List<Long> findAddressesIdByOwnershipId(@Param("ownershipId") Long ownershipId);
}
