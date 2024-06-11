package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.business.model.PollSchedule;
import ru.pstu.poll_system_service.data.model.Poll;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long>, JpaSpecificationExecutor<Poll> {

    @Query(value = "SELECT * FROM poll WHERE (date_part('day', CAST(current_date AS timestamp) - end_date)) >= 365",
            nativeQuery = true)
    List<Long> findAllClosed();

    @Query(value = "select s from PollSchedule as s")
    List<PollSchedule> findAllSchedule();

    /**
     * Получить список опросов, у которых есть расписание  и они active или planned
     * */
    @Query(value = "select p from Poll as p where p.schedule.type != 'NO_SCHEDULE' and p.status in ('active', 'planned')")
    List<Poll> findAllActiveAndPlannedPollWithSchedule();

    /**
     * Возвращает список доступных опросов
     */
    @Query(value = "select p.id from poll as p" +
            " where p.adress_id in (select address_id from ownership_address\n" +
            "                where ownership_id = :ownership_id) and p.status not in ('returned', 'proposed') and id not in (" +
            "select poll_id from unavailable_poll_for_user " +
            "where user_id = :userId and poll_id = p.id)", nativeQuery = true)
    List<Long> findAvailablePollsIdsForUser(@Param("ownership_id") Long ownership_id, @Param("userId") Long userId);

    /**
     * Возвращает список доступных опросов
     */
    @Query(value = "select p.id from poll as p" +
            " where p.adress_id in (select address_id from ownership_address\n" +
            "                where ownership_id = :ownership_id) and p.status in ('returned', 'proposed') and id not in (" +
            "select poll_id from unavailable_poll_for_user " +
            "where user_id = :userId and poll_id = p.id)", nativeQuery = true)
    List<Long> findSuggestedPollsIdsForUser(@Param("ownership_id") Long ownership_id, @Param("userId") Long userId);

    @Query(value = "select count(*) from ownership_address as ad_own " +
                    "left join poll as p on p.adress_id = ad_own.address_id " +
                        "inner join \"user\" as u on u.ownership_id = ad_own.ownership_id " +
                            "where p.id = :pollId and u.id not in (select 1 from unavailable_poll_for_user AS upfu " +
                                            "where upfu.poll_id = :pollId and upfu.user_id = u.id)", nativeQuery = true)
    Long getMaxNumberVoted(@Param("pollId") Long pollId);

    Page<Poll> findAllByIdIn(Collection<Long> id, Pageable pageable);

    /**
     * Проверяет опросы:
     * - является ли он active (если опрос неактивный, то его нельзя редачить никому)
     * - не скрыт ли он от пользователя
     * - доступен ли он по адресу пользователя
     */
    @Query(value = "select COUNT(*) > 0 from poll as p " +
            "    where p.adress_id in (select address_id from ownership_address " +
            "        where ownership_id = :ownershipId) and p.status not in ('returned', 'proposed') and p.id in :pollIds and id not in ( " +
            "            select poll_id from unavailable_poll_for_user " +
            "                where user_id = :userId and poll_id = p.id)", nativeQuery = true)
    boolean pollsIsAvailableForUser(@Param("pollIds") List<Long> pollIds,
                                    @Param("userId") Long userId,
                                    @Param("ownershipId") Long ownershipId);

    @Query(value = "select count(*) > 0 from poll as p " +
            "join poll_value as pv on p.id = pv.poll_id " +
                "join users_answer as u_a on pv.id = u_a.poll_value_id " +
                    "where p.id = :pollId and u_a.user_id = :userId", nativeQuery = true)
    boolean userIsVoted(@Param("pollId") Long pollId, @Param("userId") Long userId);

    Optional<Poll> findPollByIdEquals(Long id);
}