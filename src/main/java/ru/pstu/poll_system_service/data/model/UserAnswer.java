package ru.pstu.poll_system_service.data.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_answer", schema = "public")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAnswer{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "poll_value_id")
    private Long pollValueId;
}
