package ru.pstu.poll_system_service.web.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.Objects;

@Data
@Builder
@Schema(description = "Адрес")
public class AddressInfo {

    private Long id;

    private String city;

    private String street;

    private String houseNumber;

    private Long apartmentNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressInfo that = (AddressInfo) o;
        return Objects.equals(city, that.city)
                && Objects.equals(street, that.street)
                && Objects.equals(houseNumber, that.houseNumber)
                && Objects.equals(apartmentNumber, that.apartmentNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(city, street, houseNumber, apartmentNumber);
    }
}
