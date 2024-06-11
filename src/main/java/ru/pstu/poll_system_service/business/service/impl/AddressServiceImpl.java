package ru.pstu.poll_system_service.business.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.business.service.AddressService;
import ru.pstu.poll_system_service.data.model.user.address.Address;
import ru.pstu.poll_system_service.data.model.user.address.OwnershipAddress;
import ru.pstu.poll_system_service.data.model.user.address.OwnershipAddressKey;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationRequest;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationRequestKey;
import ru.pstu.poll_system_service.data.repository.address.AddressRepository;
import ru.pstu.poll_system_service.data.repository.address.OwnershipAddressRepository;
import ru.pstu.poll_system_service.data.repository.address.RelocationRepository;
import ru.pstu.poll_system_service.data.repository.user.UserWithAddressRepository;
import ru.pstu.poll_system_service.web.dto.user.AddressInfo;

import static ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction.ADD;
import static ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction.DELETE;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserFromContext;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final RelocationRepository relocationRepository;

    private final AddressRepository addressRepository;

    private final UserWithAddressRepository userWithAddressRepository;

    private final OwnershipAddressRepository ownershipAddressRepository;

    @Override
    @Transactional
    public void add(@NotNull AddressInfo addressInfo){
        relocationRepository.save(new RelocationRequest(RelocationRequestKey.builder()
                .action(ADD)
                .apartmentNumber(addressInfo.getApartmentNumber().toString())
                .houseNumber(addressInfo.getHouseNumber())
                .street(addressInfo.getStreet())
                .city(addressInfo.getCity())
                .userId(getCurrentUserIdFromContext())
                .build()));
    }

    @Override
    @Transactional
    public void delete(@NotNull Long addressId, @NotNull Long apartmentNumber) {
        var address = userWithAddressRepository.findByOwnershipIdAndAddressIdAndApartmentNumber(
                addressId, getCurrentUserFromContext().getOwnershipId(), apartmentNumber).orElseThrow(() ->
                new IllegalArgumentException("Указан несуществующий адрес!"));

        relocationRepository.save(new RelocationRequest(RelocationRequestKey.builder()
                .action(DELETE)
                .apartmentNumber(address.getOwnershipAddressKey().getApartmentNumber().toString())
                .houseNumber(address.getAddress().getHouseNumber())
                .street(address.getAddress().getStreet())
                .city(address.getAddress().getCity())
                .userId(getCurrentUserIdFromContext())
                .build()));
    }

    @Override
    public void deny(@NotNull AddressInfo addressInfo, @NotNull Long userId, @NotNull RelocationAction relocationAction) {
        relocationRepository.delete(RelocationRequest.builder()
                        .relocationRequestKey(RelocationRequestKey.builder()
                                .userId(userId)
                                .city(addressInfo.getCity())
                                .street(addressInfo.getStreet())
                                .houseNumber(addressInfo.getHouseNumber())
                                .apartmentNumber(addressInfo.getApartmentNumber().toString())
                                .action(relocationAction)
                                .build())
                .build());
    }

    @Override
    @Transactional
    public void accept(@NotNull AddressInfo addressInfo, @NotNull Long userId, @NotNull RelocationAction relocationAction) {
        var ownership = userWithAddressRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Неверный user id!"))
                .getOwnership();

        var addressOpt = addressRepository
                .findByCityAndStreetAndHouseNumberEquals(
                        addressInfo.getCity(),
                        addressInfo.getStreet(),
                        addressInfo.getHouseNumber());

        Address address;
        if(relocationAction == ADD){
            address = addressOpt.orElseGet(() -> addressRepository.save(Address.builder()
                    .city(addressInfo.getCity())
                    .street(addressInfo.getStreet())
                    .houseNumber(addressInfo.getHouseNumber())
                    .build()));
        }
        else {
            address = addressRepository.findById(addressInfo.getId()).orElseThrow(() ->
                    new IllegalArgumentException("Указанный адрес не существует"));
        }


        var ownershipAddressKey = OwnershipAddressKey.builder()
                .addressId(address.getId())
                .ownershipId(ownership.getId())
                .apartmentNumber(addressInfo.getApartmentNumber())
                .build();

        if(relocationAction == ADD){
            ownershipAddressRepository.save(OwnershipAddress.builder()
                    .ownership(ownership)
                    .ownershipAddressKey(ownershipAddressKey)
                    .address(address)
                    .build());
        }
        else{
            ownershipAddressRepository.deleteByKey(
                    ownershipAddressKey.getAddressId(),
                    ownershipAddressKey.getOwnershipId(),
                    ownershipAddressKey.getApartmentNumber()
            );
        }


        relocationRepository.delete(RelocationRequest.builder()
                .relocationRequestKey(RelocationRequestKey.builder()
                        .userId(userId)
                        .city(addressInfo.getCity())
                        .street(addressInfo.getStreet())
                        .houseNumber(addressInfo.getHouseNumber())
                        .apartmentNumber(addressInfo.getApartmentNumber().toString())
                        .action(relocationAction)
                        .build())
                .build());
    }

}
