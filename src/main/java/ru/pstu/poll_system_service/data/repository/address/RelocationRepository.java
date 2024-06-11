package ru.pstu.poll_system_service.data.repository.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationRequest;
import ru.pstu.poll_system_service.data.model.user.address.relocation.RelocationRequestKey;

@Repository
public interface RelocationRepository extends JpaRepository<RelocationRequest, RelocationRequestKey>, JpaSpecificationExecutor<RelocationRequest> {

}
