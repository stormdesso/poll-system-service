package ru.pstu.poll_system_service.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "role", schema = "public")
public class Role{
    @Id
    Long id;

    @Column(name = "role_name")
    String roleName;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Privilege.class)
    List<Privilege> privilege;
}
