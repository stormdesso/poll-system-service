package ru.pstu.poll_system_service.web.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

import java.util.Objects;

@Data
@Builder
@Schema(description = "Адрес")
public class AddressInfo {

    private Long id;

    @NotBlank(message = "Поле city не должно быть пустым")
    private String city;

    @NotBlank(message = "Поле street не должно быть пустым")
    private String street;

    @NotBlank(message = "Поле houseNumber не должно быть пустым")
    private String houseNumber;

    @NotNull(message = "Поле apartmentNumber не может быть null")
    @Positive(message = "Поле apartmentNumber не может быть меньше 1")
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
