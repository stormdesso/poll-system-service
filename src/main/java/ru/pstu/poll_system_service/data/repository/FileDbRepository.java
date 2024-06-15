package ru.pstu.poll_system_service.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.FileEntity;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Репозиторий для хранения файлов в БД
 * */
@Repository
public interface FileDbRepository extends JpaRepository<FileEntity, Long>{
    List<FileEntity> findByPollId(Long pollId);

    @Query(value = "select f.id from FileEntity AS f where f.pollId = :pollId")
    Set<Long> getFilesIdsByPollId(@Param("pollId") Long pollId);

    Set<FileEntity> findByIdIn(Set<Long> id);

    List<FileEntity> findFileEntitiesByIdIsIn(Collection<Long> filesIds);
}


