package ru.pstu.poll_system_service.data.model.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity(name = "user")
@Table(name = "user", schema = "public")
public class UserWithAddress {

    @Id
    @Column(name = "id")
    Long id;

    @Column(name = "address_id")
    Long addressId;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "birth_date")
    Date birthdate;

    @Column(name = "login")
    String login;

    @Column(name = "password")
    String password;

    @Column(name = "phone_number")
    String phoneNumber;

    @Column(name = "email")
    String email;

    @Column(name = "is_blocked")
    boolean isBlocked;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Role.class)
    List<Role> role;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Ownership.class)
    Ownership ownership;
}
