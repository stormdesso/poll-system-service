package ru.pstu.poll_system_service.data.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "role", schema = "public")
public class Role{
    @Id
    Long id;

    @Column(name = "role_name")
    String roleName;
}
