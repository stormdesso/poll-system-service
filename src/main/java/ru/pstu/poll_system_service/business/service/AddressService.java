package ru.pstu.poll_system_service.business.service;

import org.jetbrains.annotations.NotNull;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationAction;
import ru.pstu.poll_system_service.web.dto.user.AddressInfo;

public interface AddressService {
    void add(@NotNull AddressInfo addressInfo);

    void delete(@NotNull Long addressId, @NotNull Long apartmentNumber);

    void deny(@NotNull AddressInfo addressInfo, @NotNull Long userId, @NotNull RelocationAction relocationAction);

    void accept(@NotNull AddressInfo addressInfo, @NotNull Long userId, @NotNull RelocationAction relocationAction);
}
