package ru.pstu.poll_system_service.data.model.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "address", schema = "public")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house_number")
    private String houseNumber;
}
