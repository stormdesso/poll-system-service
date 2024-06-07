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
    @Query(value = "select address_id from ownership_address where ownership_id = :ownershipId", nativeQuery = true)
    List<Long> findAddressesIdByOwnershipId(@Param("ownershipId") Long ownershipId);

    @Query(value = "insert into relocation_request (user_id, city, street, house_number, apartment_number) " +
            "values (:userId, :city, :street, :houseNumber, :apartmentNumber);", nativeQuery = true)
    void saveNewAddresses(@Param("userId") Long userId,
                          @Param("city") String city,
                          @Param("street") String street,
                          @Param("houseNumber") String houseNumber,
                          @Param("apartmentNumber") Long apartmentNumber
    );

}
