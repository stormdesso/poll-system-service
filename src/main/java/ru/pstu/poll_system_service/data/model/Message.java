package ru.pstu.poll_system_service.data.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "message", schema = "public")
@Data
public class Message{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    @ColumnDefault("0")
    private Long userId;

    @Column(name = "poll_id")
    private Long pollId;

    @Column(name = "date_sent_message", nullable = false, columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private Date dateSentMessage;

    @Column(name = "message", nullable = false, length = 500)
    private String message;
}
