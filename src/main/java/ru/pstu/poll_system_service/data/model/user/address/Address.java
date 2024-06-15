package ru.pstu.poll_system_service.data.model.user.address;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.pstu.poll_system_service.web.dto.user.AddressInfo;

import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address", schema = "public")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house_number")
    private String houseNumber;

    public boolean equalsToDto(AddressInfo address) {
        if (address == null ) return false;
        return Objects.equals(city, address.getCity())
                && Objects.equals(street, address.getStreet())
                && Objects.equals(houseNumber, address.getHouseNumber());
    }
}