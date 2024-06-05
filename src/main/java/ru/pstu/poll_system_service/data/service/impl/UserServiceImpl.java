package ru.pstu.poll_system_service.data.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.enums.RoleEnum;
import ru.pstu.poll_system_service.data.mapper.UserMapper;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.data.model.user.UserWithAddress;
import ru.pstu.poll_system_service.data.repository.UserRepository;
import ru.pstu.poll_system_service.data.repository.UserWithAddressRepository;
import ru.pstu.poll_system_service.data.service.UserService;
import ru.pstu.poll_system_service.web.dto.user.UserDto;
import ru.pstu.poll_system_service.web.security.model.SecurityUser;

import java.util.Collections;
import java.util.List;

import static ru.pstu.poll_system_service.data.enums.RoleEnum.admin;
import static ru.pstu.poll_system_service.data.enums.RoleEnum.root;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserFromContext;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final UserWithAddressRepository userWithAddressRepository;

    private List<RoleEnum> getCurrentRoles(){
       List<String> roles =  getCurrentUserFromContext().getRole().stream().map(Role::getRoleName).toList();
       return roles.stream().map(RoleEnum::valueOf).toList();
    }

    private void removeFromListByRole(RoleEnum role, @NotNull List<UserWithAddress> users){
       users.removeIf(userWithAddress -> userWithAddress.getRole().stream().map(Role::getRoleName).toList()
                    .contains(role.name()));
    }

    private void excludeUnavailableUsersByRole( List<UserWithAddress> users){
        if(getCurrentRoles().contains(admin)){
            removeFromListByRole(admin, users);
            removeFromListByRole(root, users);
        }
        if(getCurrentRoles().contains(root)){
            removeFromListByRole(root, users);
        }
    }

    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                log.debug("Поиск пользователя с login:{} в базе", username);
                var user =  userRepository.findUserByLogin(username);
                if (user.isEmpty()){
                    throw new AccessDeniedException("Пользователь не найден");
                }
                return new SecurityUser(user.get(), Collections.emptyList());
            }
        };
    }

    @Override
    public List<UserDto> findAllAvailableUsers() {
        var addresses = userRepository.findAddressesIdByOwnershipId(getCurrentUserIdFromContext());
        var users =  userWithAddressRepository.findAllByAddressIdIn(addresses);
        excludeUnavailableUsersByRole(users);

        return UserMapper.INSTANCE.convertToUserDtos(users);
    }

    private List<UserDto> findUsers(List<Long> userIds) {
        var users = userWithAddressRepository.findAllByIdIn(userIds);
        return UserMapper.INSTANCE.convertToUserDtos(users);
    }

    @Override
    public UserDto getAuthenticatedUserInfo() {
        return findUsers(List.of(getCurrentUserIdFromContext())).getFirst();
    }

    @Override
    public void editAuthenticatedUserInfo(UserDto userDto) {

    }

    @Override
    public void editUsersInfos(List<UserDto> userDtos) {

    }

    @Override
    public void deleteAuthenticatedAccount() {

    }

    @Override
    public void deleteAccountsInfos(List<Long> usersIds) {

    }
}
