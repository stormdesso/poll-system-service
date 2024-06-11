package ru.pstu.poll_system_service.business.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "poll_sсhedule", schema = "public")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PollSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private  Long id;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Basic(optional = false)
    @Column(name = "type")
    private ScheduleType type;

    @Column(name = "count_days")
    private String countDays;

}
