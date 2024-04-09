package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.enums.StatusEnum;
import ru.pstu.poll_system_service.data.model.Poll;

import java.util.Collection;
import java.util.List;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> , JpaSpecificationExecutor<Poll>{
    List<Poll> findAllByStatusIsNotIn(Collection<StatusEnum> status);
}