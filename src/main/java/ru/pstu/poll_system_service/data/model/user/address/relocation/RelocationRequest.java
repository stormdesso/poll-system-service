package ru.pstu.poll_system_service.data.model.user.address.relocation;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "relocation_request", schema = "public")
public class RelocationRequest {

    @EmbeddedId
    RelocationRequestKey relocationRequestKey;
}
