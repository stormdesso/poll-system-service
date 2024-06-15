package ru.pstu.poll_system_service.data.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import jakarta.persistence.*;

@Entity
@Table(name = "poll_value", schema = "public")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PollValue{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    private Poll poll;

    @Column(name = "value", nullable = false, length = 50)
    private String value;

    @Formula("(SELECT COUNT(*) FROM users_answer AS ua\n" +
            "    WHERE ua.poll_value_id = id)")
    private Long votes; //число голосов
}
