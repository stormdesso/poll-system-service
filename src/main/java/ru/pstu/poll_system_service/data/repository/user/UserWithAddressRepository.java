package ru.pstu.poll_system_service.data.repository.user;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.user.address.OwnershipAddress;
import ru.pstu.poll_system_service.data.model.user.address.UserWithAddress;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserWithAddressRepository extends JpaRepository<UserWithAddress, Long>, JpaSpecificationExecutor<UserWithAddress> {

    List<UserWithAddress> findAllByIdIn(Collection<Long> id);

    /**
     * Получить список пользователей по указанному ownershipId
     * */
    @Query(value = "select o_a.ownership.user from ownership_address as o_a " +
                        "where o_a.ownershipAddressKey.addressId in " +
                            "(select o_a1.ownershipAddressKey.addressId from ownership_address as o_a1 " +
                                "where o_a1.ownershipAddressKey.ownershipId = :ownershipId)")
    List<UserWithAddress> findAllAvailableUsersByOwnershipId(@Param("ownershipId") Long ownershipId, Pageable pageable);

//    /**
//     * Получить список пользователей по указанному ownershipId
//     * */
//    @Query(value = "select distinct(u.id)from ownership_address as o_a " +
//                        "join \"user\" as u on u.ownership_id = o_a.ownership_id " +
//                            "where o_a.address_id in ( " +
//                                "select o_a.address_id from ownership_address as o_a " +
//                                    "where o_a.ownership_id = :ownershipId);", nativeQuery = true)
//    List<Long> findAllAvailableUsersIdByOwnershipId(@Param("ownershipId") Long ownershipId, Pageable pageable);

    /**
     * Получить список пользователей по указанному ownershipId и разрешённому списку пользователей
     * */
    @Query(value = "select o_a.ownership.user from ownership_address as o_a " +
                        "where o_a.ownership.user.id in :usersIds and o_a.ownershipAddressKey.addressId in " +
                            "(select o_a1.ownershipAddressKey.addressId from ownership_address as o_a1 " +
                                "where o_a1.ownershipAddressKey.ownershipId = :ownershipId)")
    List<UserWithAddress> findAllAvailableUsersByOwnershipIdAndUsersList(@Param("ownershipId") Long ownershipId,
                                                                         @Param("usersIds") List<Long> usersIds);
    @Query(value = "select o_a from ownership_address as o_a " +
                        "where o_a.ownershipAddressKey.addressId = :addressId " +
                        "and o_a.ownershipAddressKey.ownershipId = :ownershipId " +
                        "and o_a.ownershipAddressKey.apartmentNumber = :apartmentNumber")
    Optional<OwnershipAddress> findByOwnershipIdAndAddressIdAndApartmentNumber(@Param("addressId") Long addressId,
                                                                               @Param("ownershipId") Long ownershipId,
                                                                               @Param("apartmentNumber") Long apartmentNumber);

}
