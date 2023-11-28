package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{
    List<Message> findByPollId(Long pollId);
}
