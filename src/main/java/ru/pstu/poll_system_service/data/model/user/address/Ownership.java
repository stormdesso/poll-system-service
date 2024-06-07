package ru.pstu.poll_system_service.data.model.user.address;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.EAGER;

@Data
@Entity
@Table(name = "ownership", schema = "public")
public class Ownership {

    @OneToOne(mappedBy = "ownership",fetch = EAGER)
    private UserWithAddress user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = ALL, fetch = EAGER, targetEntity = OwnershipAddress.class, mappedBy = "ownership")
    List<OwnershipAddress> ownershipAddresses;
}
