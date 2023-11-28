package ru.pstu.poll_system_service.data.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.model.Poll;
import ru.pstu.poll_system_service.data.mapper.PollMapper;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.utils.FilterUtil;
import ru.pstu.poll_system_service.web.common.entity.Page;
import ru.pstu.poll_system_service.web.dto.PollDto;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService{

    private final PollRepository pollRepository;

    public Page<PollDto> getFilteredPolls(String sortingField, Long limit, Long page) {

        String sortDirection = FilterUtil.getSortDirection(sortingField);   //  todo: переделать на класс PollFilter
        sortingField = FilterUtil.formatSortingField(sortingField);


        Pageable pageable = PageRequest.of( page.intValue(), limit.intValue(), getSort(sortingField, sortDirection) );

        org.springframework.data.domain.Page<Poll> pollEntitiesPage = pollRepository.findAll((Specification<Poll>) null, pageable);


        return new Page<>(PollMapper.INSTANCE.toPollDtos(pollEntitiesPage.getContent()), pollEntitiesPage.getTotalElements(), pollEntitiesPage.stream().count());
    }

    private Sort getSort(String sortingField, String sortOrder) {
        if (sortingField != null && !sortingField.isEmpty() && sortOrder != null && !sortOrder.isEmpty()) {
            return Sort.by(Sort.Direction.fromString(sortOrder), sortingField);
        }
        return Sort.unsorted();
    }
}
