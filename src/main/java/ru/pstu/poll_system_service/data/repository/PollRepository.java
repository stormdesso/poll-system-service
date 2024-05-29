package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.Poll;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long>, JpaSpecificationExecutor<Poll> {

    /**
     * Возвращает список доступных опросов
     */
    @Query(value = "select p.id from poll as p" +
            " where p.adress_id in (select address_id from address_ownership\n" +
            "                where ownership_id = :ownership_id) and p.status = 'active' and id not in (" +
            "select poll_id from unavailable_poll_for_user " +
            "where user_id = :userId and poll_id = p.id)", nativeQuery = true)
    List<Long> getAvailablePollsIdsForUser(@Param("ownership_id") Long ownership_id, @Param("userId") Long userId);

    @Query(value = "(SELECT COUNT(aa.user_id) FROM apartment_address AS aa " +
            "WHERE aa.address_id = (SELECT p.adress_id FROM poll AS p WHERE p.id = :pollId) " +
            "AND NOT EXISTS (SELECT 1 FROM unavailable_poll_for_user AS upfu " +
            "WHERE upfu.poll_id = :pollId AND upfu.user_id = aa.user_id))", nativeQuery = true)
    Long getMaxNumberVoted(@Param("pollId") Long pollId);

    Page<Poll> findAllByIdIn(Collection<Long> id, Pageable pageable);

    /**
     * Проверяет опросы:
     * - является ли он active
     * - не скрыт ли он от пользователя
     * - доступен ли он по адресу пользователя
     */
    @Query(value = "select COUNT(*) > 0 from apartment_address AS a_p\n" +
            "    left join poll AS p on a_p.address_id = p.adress_id\n" +
            "        where p.status = 'active' and a_p.user_id = :userId and (p.id in :pollIds) and a_p.user_id not in (\n" +
            "            select u_p_u.user_id from unavailable_poll_for_user as u_p_u\n" +
            "                     where u_p_u.user_id = :userId\n" +
            "            )", nativeQuery = true)
    boolean pollsIsAvailableForUser(@Param("pollIds") List<Long> pollIds, @Param("userId") Long userId);

    Optional<Poll> findPollByIdEquals(Long id);
}