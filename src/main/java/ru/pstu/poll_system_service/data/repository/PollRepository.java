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

//    /**
//     Возвращает список доступных опросов
//     */
//    @Query(value = "select * from poll as p" +
//                        " where p.adress_id = :addressId and p.status = 'active' and id not in (" +
//                            "select poll_id from unavailable_poll_for_user " +
//                                "where user_id = :userId and poll_id = p.id)", nativeQuery = true)
//    List<Poll> getAvailablePollsForUser(@Param("addressId") Long addressId, @Param("userId") Long userId);

    /**
     Проверяет опрос:
            - является ли он active
            - не скрыт ли он от пользователя
            - доступен ли он по адресу пользователя
     */
    @Query(value = "select COUNT(*) > 0 from apartment_address AS a_p\n" +
            "    left join poll AS p on a_p.address_id = p.adress_id\n" +
            "        where p.status = 'active' and a_p.user_id = :userId and p.id = :pollId and a_p.user_id not in (\n" +
            "            select u_p_u.user_id from unavailable_poll_for_user as u_p_u\n" +
            "                     where u_p_u.user_id = :userId\n" +
            "            )", nativeQuery = true)
    boolean pollIsAvailableForUser(@Param("pollId") Long pollId,@Param("userId") Long userId);

    /**
     Проверяет опросы:
     - является ли он active
     - не скрыт ли он от пользователя
     - доступен ли он по адресу пользователя
     */
    @Query(value = "select COUNT(*) > 0 from apartment_address AS a_p\n" +
            "    left join poll AS p on a_p.address_id = p.adress_id\n" +
            "        where p.status = 'active' and a_p.user_id = :userId and (p.id in :pollIds) and a_p.user_id not in (\n" +
            "            select u_p_u.user_id from unavailable_poll_for_user as u_p_u\n" +
            "                     where u_p_u.user_id = :userId\n" +
            "            )", nativeQuery = true)
    boolean pollsIsAvailableForUser(@Param("pollIds") List<Long> pollIds,@Param("userId") Long userId);

    Optional<Poll> findPollByIdEquals(Long id);
//    /**
//     Проверяет не скрыт ли опрос для конкретного пользователя
//     */
//    @Query(value = "select case when count(*) = 0 then true else false end from unavailable_poll_for_user " +
//                        "where user_id = :userId and poll_id = :pollId", nativeQuery = true)
//    boolean pollIsNotHidden(@Param("pollId") Long pollId,@Param("userId") Long userId);
}