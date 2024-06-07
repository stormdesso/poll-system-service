package ru.pstu.poll_system_service.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.data.model.user.address.Ownership;
import ru.pstu.poll_system_service.data.model.user.address.UserWithAddress;
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

    default List<String> map(List<Role> role) {
        return role.stream().map(Role::getRoleName).toList();
    }

    default List<AddressInfo> map(Ownership ownership) {

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


    default List<Role> map(List<String> rolesNames, List<Role> allRoles) {
        return allRoles.stream().filter(role -> rolesNames.contains(role.getRoleName())).toList();
    }
}
