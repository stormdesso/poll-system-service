package ru.pstu.poll_system_service.data.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "poll", schema = "public")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Poll{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private  Long id;

    @Column(name = "creator_user_id", nullable = false)
    private Long creatorUserId;

    @Column(name = "poll_shedule_id", nullable = true)
    private Long pollScheduleId;

    @Column(name = "adress_id", nullable = false)
    private Long addressId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "duration", nullable = false)
    private Integer duration;

//    @Enumerated(EnumType.STRING)
//    @Convert(converter = StatusEnumConverter.class)
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "cyclical", nullable = false)
    private Boolean cyclical;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, targetEntity = PollValue.class, fetch = FetchType.EAGER)
    private List<PollValue> pollValues;

    @Column(name = "max_number_answers_by_user")
    private Long maxNumberAnswersByUser;

    /**
    Возвращает число проголосовавших в опросе
    * */
    public Long getNumberVotes(){
        return getPollValues().stream().mapToLong(PollValue::getVotes).sum();
    }
}
