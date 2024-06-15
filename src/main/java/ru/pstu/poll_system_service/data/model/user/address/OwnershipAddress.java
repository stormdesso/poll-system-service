package ru.pstu.poll_system_service.data.model.user.address;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Полный адрес:
 *      Объект Адрес: город, улица, дом + номер квартиры
 * */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ownership_address")
@Table(name = "ownership_address", schema = "public")
public class OwnershipAddress {

    @MapsId("ownershipId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ownership_id", referencedColumnName = "id")
    private Ownership ownership;

    @EmbeddedId
    private OwnershipAddressKey ownershipAddressKey;

    /**
     * Адрес: город, улица, дом
     * */
    @MapsId("addressId") //говорим, что id в этой сущности такой же как и у нашего addressId
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Address.class)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
}
