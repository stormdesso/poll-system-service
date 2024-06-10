package ru.pstu.poll_system_service.data.repository.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.user.address.Address;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>, JpaSpecificationExecutor<Address> {
    Optional<Address> findByCityAndStreetAndHouseNumberEquals(String city, String street, String houseNumber);
}
