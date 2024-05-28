package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.Poll;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> , JpaSpecificationExecutor<Poll>{

    /**
     Возвращает список доступных опросов
     */
    @Query(value = "select * from poll as p" +
                        " where p.adress_id = :addressId and p.status = 'active' and id not in (" +
                            "select poll_id from unavailable_poll_for_user " +
                                "where user_id = :userId and poll_id = p.id)", nativeQuery = true)
    List<Poll> getAvailablePollsForUser(@Param("addressId") Long addressId, @Param("userId") Long userId);


    Optional<Poll> findPollByIdEquals(Long id);


    /**
     Проверяет доступен ли опрос для конкретного пользователя
     * */
    @Query(value = "select case when count(*) = 0 then true else false end from unavailable_poll_for_user " +
                        "where user_id = :userId and poll_id = :pollId", nativeQuery = true)
    boolean pollIsAvailable(@Param("pollId") Long pollId,@Param("userId") Long userId);
}