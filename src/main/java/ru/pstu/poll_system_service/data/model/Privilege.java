package ru.pstu.poll_system_service.data.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "privilege", schema = "public")
public class Privilege{

    @Id
    Long id;

    @Column(name = "system_object_name")
    String systemObjectName;

    @Column(name = "action_name")
    String actionName;
}
