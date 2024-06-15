package ru.pstu.poll_system_service.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelocationRequestDto {

    Long userId;

    private String city;

    private String street;

    private String houseNumber;

    private String apartmentNumber;

    RelocationAction action;
}
