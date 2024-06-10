package ru.pstu.poll_system_service.data.model.user.address;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.EAGER;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ownership", schema = "public")
public class Ownership {

    @MapsId("userId") //говорим, что id в этой сущности такой же как и у нашего userId
    @OneToOne(mappedBy = "ownership",fetch = EAGER)
    private UserWithAddress user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(cascade = ALL, fetch = EAGER, targetEntity = OwnershipAddress.class, mappedBy = "ownership")
    List<OwnershipAddress> ownershipAddresses;
}
