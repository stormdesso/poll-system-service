package ru.pstu.poll_system_service.data.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.enums.RoleEnum;
import ru.pstu.poll_system_service.data.mapper.UserMapper;
import ru.pstu.poll_system_service.data.model.user.Role;
import ru.pstu.poll_system_service.data.model.user.address.UserWithAddress;
import ru.pstu.poll_system_service.data.repository.RoleRepository;
import ru.pstu.poll_system_service.data.repository.UserRepository;
import ru.pstu.poll_system_service.data.repository.UserWithAddressRepository;
import ru.pstu.poll_system_service.data.service.UserService;
import ru.pstu.poll_system_service.web.dto.user.UserDto;
import ru.pstu.poll_system_service.web.security.model.SecurityUser;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

import static ru.pstu.poll_system_service.data.enums.RoleEnum.admin;
import static ru.pstu.poll_system_service.data.enums.RoleEnum.root;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserFromContext;
import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

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

    void validate(@NotNull UserDto userDto){
        final String EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

        if (userDto.getFullName() == null || !userDto.getFullName().matches("[a-zA-Zа-яА-Я\\s]+")) {
            throw new IllegalArgumentException("Ошибка: ФИО должно состоять только из букв.");
        }

        if (userDto.getPhoneNumber() == null || !userDto.getPhoneNumber().matches("\\d+")) {
            throw new IllegalArgumentException("Ошибка: Номер телефона не должен содержать букв.");
        }

        if (userDto.getBirthdate() == null || !userDto.getBirthdate().before(new Date())) {
            throw new IllegalArgumentException("Ошибка: Дата рождения должна быть меньше сегодняшней даты.");
        }

        if (userDto.getEmail() == null || ! Pattern.matches(EMAIL_REGEX, userDto.getEmail())) {
            throw new IllegalArgumentException("Ошибка: Неверный адрес электронной почты.");
        }

    }

    @NotNull
    private String validatePassword(@Nullable String password) {
        if (password == null){
            password = "";
        }
        return password;
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
        var users =  userWithAddressRepository.findAllAvailableUsersByOwnershipId(
                getCurrentUserFromContext().getOwnershipId());
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
    @Transactional
    public void editAuthenticatedUserInfo(UserDto userDto, String password) {
        validate(userDto);
        password = validatePassword(password);

        var userEntity = userWithAddressRepository.findAllById(
                List.of(getCurrentUserIdFromContext())).getFirst();

        var changedUserEntity = userEntity.toBuilder()
                .fullName(userDto.getFullName())
                .phoneNumber(userDto.getPhoneNumber())
                .birthdate(userDto.getBirthdate())
                .email(userDto.getEmail())
                .password( password.isBlank() ? password: userEntity.getPassword())
                .build();

        userWithAddressRepository.save(changedUserEntity);
    }

    @Override
    public void editUsersInfos(@NotNull List<UserDto> userDtos) {
        userDtos.forEach(this::validate);

        var usersList = userWithAddressRepository.findAllByIdIn(
                userDtos.stream().map(UserDto::getId).toList());

        excludeUnavailableUsersByRole(usersList);

        var allRoles  =roleRepository.findAll();

        List<UserWithAddress> changedUsers = userDtos.stream().map(userDto -> {
            var userEntity = usersList.stream().filter(userWithAddress ->
                    userWithAddress.getId().equals(userDto.getId()))
                    .findFirst().get();

            return userEntity.toBuilder()
                    .fullName(userDto.getFullName())
                    .phoneNumber(userDto.getPhoneNumber())
                    .birthdate(userDto.getBirthdate())
                    .email(userDto.getEmail())
                    .isBlocked(userDto.isBlocked())
                    .role(UserMapper.INSTANCE.map(userDto.getRoles(), allRoles))
                    .build();
        }).toList();

        userWithAddressRepository.saveAll(changedUsers);
    }

    @Override
    public void deleteAuthenticatedAccount() {
        userRepository.deleteById(getCurrentUserIdFromContext());
    }

    @Override
    public void deleteAccountsInfos(List<Long> usersIds) {
        var users =  userWithAddressRepository.findAllAvailableUsersByOwnershipIdAndUsersList(
                getCurrentUserFromContext().getOwnershipId(), usersIds);

        excludeUnavailableUsersByRole(users);

        userRepository.deleteAllById(users.stream().map(UserWithAddress::getId).toList());
    }
}
