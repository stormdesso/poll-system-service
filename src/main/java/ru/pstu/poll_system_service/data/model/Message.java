package ru.pstu.poll_system_service.data.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.ZonedDateTime;

@Entity
@Table(name = "message", schema = "public")
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "date_sent_message", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime dateSentMessage;

    @Column(name = "message", nullable = false, length = 500)
    private String message;
}
