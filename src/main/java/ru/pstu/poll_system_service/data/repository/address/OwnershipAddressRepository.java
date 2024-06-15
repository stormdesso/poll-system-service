package ru.pstu.poll_system_service.data.repository.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.pstu.poll_system_service.data.model.user.address.OwnershipAddress;
import ru.pstu.poll_system_service.data.model.user.address.OwnershipAddressKey;

public interface OwnershipAddressRepository extends JpaRepository<OwnershipAddress, OwnershipAddressKey>, JpaSpecificationExecutor<OwnershipAddress> {

    @Modifying
    @Query(value = "DELETE FROM ownership_address " +
                        "WHERE address_id = :addressId " +
                        "AND ownership_id = :ownershipId " +
                        "AND apartment_number = :apartmentNumber; ", nativeQuery = true)
    void deleteByKey(@Param("addressId") Long addressId,
                     @Param("ownershipId") Long ownershipId,
                     @Param("apartmentNumber") Long apartmentNumber);

}
