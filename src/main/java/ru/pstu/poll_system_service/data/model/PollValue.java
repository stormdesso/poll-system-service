package ru.pstu.poll_system_service.data.model;

import lombok.Data;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Table(name = "poll_value", schema = "public")
@Data
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
