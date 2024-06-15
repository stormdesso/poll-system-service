package ru.pstu.poll_system_service.data.mapper;

import org.jetbrains.annotations.NotNull;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.data.model.user.address.*;
import ru.pstu.poll_system_service.web.dto.user.AddressInfo;
import ru.pstu.poll_system_service.web.dto.user.UserDto;

import java.util.List;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    List<UserDto> toUserDtos(List<UserWithAddress> userWithAddresses);

    default List<UserDto> convertToUserDtos(List<UserWithAddress> userWithAddresses){
        var userDtos = UserMapper.INSTANCE.toUserDtos(userWithAddresses);

        userDtos.forEach(userDto -> {
            var user = userWithAddresses.stream().filter(userWithAddress ->
                    userWithAddress.getId().equals(userDto.getId())).findFirst().get();

            userDto.setRoles(UserMapper.INSTANCE.map(user.getRole()));
            userDto.setAddressInfos(UserMapper.INSTANCE.map(user.getOwnership()));
        });
        return userDtos;
    }

    default List<String> map(@NotNull List<Role> role) {
        return role.stream().map(Role::getRoleName).toList();
    }

    default List<AddressInfo> map(@NotNull Ownership ownership) {

        return ownership.getOwnershipAddresses().stream().map(ownershipAddress ->
            AddressInfo.builder()
                    .id(ownershipAddress.getAddress().getId())
                    .city(ownershipAddress.getAddress().getCity())
                    .street(ownershipAddress.getAddress().getStreet())
                    .houseNumber(ownershipAddress.getAddress().getHouseNumber())
                    .apartmentNumber(ownershipAddress.getOwnershipAddressKey().getApartmentNumber())
                    .build()
        ).toList();
    }


    default List<Role> map(List<String> rolesNames, @NotNull List<Role> allRoles) {
        return allRoles.stream().filter(role -> rolesNames.contains(role.getRoleName())).toList();
    }

    default List<OwnershipAddress> mapToList(@NotNull List<AddressInfo> addressInfo, @NotNull List<Address> addresses, @NotNull Ownership ownership) {
        return addressInfo.stream().map(addressDto -> map(
                addressDto,
                addresses.stream().filter(address -> address.equalsToDto(addressDto)).toList().getFirst(),
                ownership)
        ).toList();
    }

    /**
     * Оставляет поле ownership null
     * */
    default OwnershipAddress map(@NotNull AddressInfo addressInfo, @NotNull Address address, @NotNull Ownership ownership) {

        OwnershipAddressKey ownershipAddressKey = OwnershipAddressKey.builder()
                .addressId(addressInfo.getId())
                .ownershipId(ownership.getId())
                .apartmentNumber(addressInfo.getApartmentNumber())
                .build();

        return OwnershipAddress.builder()
                .ownership(ownership)
                .ownershipAddressKey(ownershipAddressKey)
                .address(address)
                .build();
    }
}
