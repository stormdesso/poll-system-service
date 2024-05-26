package ru.pstu.poll_system_service.data.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.service.GeneralService;

import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@RequiredArgsConstructor
public class GeneralServiceImpl implements GeneralService{

    private final PollRepository pollRepository;

    @Override
    public void hasAccessToPoll(Long id){
        if(pollRepository.pollIsAvailableForUser(id, getCurrentUserIdFromContext()))
            throw new AccessDeniedException("Нет доступа к опросу!");
    }
}
