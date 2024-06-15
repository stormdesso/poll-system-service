package ru.pstu.poll_system_service.data.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.UserAnswer;

/**
 Репозиторий для ответов пользователя
 */

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long>{

    /**
     Возвращает число голосов, которое отправил пользователь в опросе
     * */
    @Query(value = "SELECT COUNT(u_a.userId) FROM UserAnswer  AS u_a " +
            "WHERE u_a.userId = :userId AND u_a.pollValueId IN " +
                "(SELECT p_v.id FROM PollValue AS p_v WHERE p_v.poll.id = :pollId) ")
    Long getNumberOfVotesByUser(@Param("userId") Long userId, @Param("pollId") Long pollId);

}
