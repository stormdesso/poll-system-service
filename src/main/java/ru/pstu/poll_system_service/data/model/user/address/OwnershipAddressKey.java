package ru.pstu.poll_system_service.data.model.user.address;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class OwnershipAddressKey implements Serializable {

    @Column(name = "ownership_id")
    private Long ownershipId;

    @Column(name = "address_id")
    private Long addressId;

    @Column(name = "apartment_number")
    private Long apartmentNumber;
}
