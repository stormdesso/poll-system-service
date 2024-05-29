package ru.pstu.poll_system_service.data.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import ru.pstu.poll_system_service.data.repository.PollRepository;
import ru.pstu.poll_system_service.data.service.GeneralService;

import java.util.List;

import static ru.pstu.poll_system_service.web.common.UserDetailsUtil.getCurrentUserIdFromContext;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeneralServiceImpl implements GeneralService{

    private final PollRepository pollRepository;

    @Override
    public void hasAccessToPolls(List<Long> ids){
        log.debug("Проверка доступа к опросам с id: {}", ids.toString());
        if(!pollRepository.pollsIsAvailableForUser(ids, getCurrentUserIdFromContext())){
            log.debug("Нет доступа к опросу!");
            throw new AccessDeniedException("Нет доступа к опросу!");
        }
    }
}
