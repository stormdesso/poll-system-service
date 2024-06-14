package ru.pstu.poll_system_service.business.mapper;

import org.jetbrains.annotations.NotNull;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.business.dto.RelocationRequestDto;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationRequest;

import java.util.List;

@Mapper
public interface RelocationRequestMapper {
    RelocationRequestMapper INSTANCE = Mappers.getMapper(RelocationRequestMapper.class);

    default List<RelocationRequestDto> map(@NotNull List<RelocationRequest> relocationRequests){

        return relocationRequests.stream().map(relocationRequest ->
             RelocationRequestDto.builder()
                    .userId(relocationRequest.getRelocationRequestKey().getUserId())
                     .street(relocationRequest.getRelocationRequestKey().getStreet())
                     .city(relocationRequest.getRelocationRequestKey().getCity())
                     .houseNumber(relocationRequest.getRelocationRequestKey().getHouseNumber())
                     .apartmentNumber(relocationRequest.getRelocationRequestKey().getApartmentNumber())
                     .action(RelocationAction.valueOf(relocationRequest.getRelocationRequestKey().getAction()))
                    .build()
        ).toList();
    }
}
