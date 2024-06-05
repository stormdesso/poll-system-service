package ru.pstu.poll_system_service.web.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Адрес")
public class AddressInfo {

    private Long id;

    private String city;

    private String street;

    private String houseNumber;
}
