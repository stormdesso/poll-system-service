package ru.pstu.poll_system_service.data.entity;

import lombok.Data;
import org.hibernate.annotations.Formula;
import ru.pstu.poll_system_service.data.enums.StatusEnum;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "poll", schema = "public")
@Data
public class Poll{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "creator_user_id", nullable = false)
    private Long creatorUserId;
//
//    @Column(name = "poll_shedule_id", nullable = false)
//    private Long pollScheduleId;
//
//    @Column(name = "adress_id", nullable = false)
//    private Long addressId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusEnum status;

    @Column(name = "number_votes", nullable = false)
    private Long numberVotes;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "cyclical", nullable = false)
    private Boolean cyclical;

    @Formula("(SELECT COUNT(aa.user_id) FROM apartment_address AS aa " +
            "WHERE aa.address_id = (SELECT p.adress_id FROM poll AS p WHERE p.id = id) " +
            "AND NOT EXISTS (SELECT 1 FROM unavailable_poll_for_user AS upfu " +
            "WHERE upfu.poll_id = id AND upfu.user_id = aa.user_id))")
    private Long maxNumberVoted;


    //  todo: варианты ответа в формате OneToMany
}
