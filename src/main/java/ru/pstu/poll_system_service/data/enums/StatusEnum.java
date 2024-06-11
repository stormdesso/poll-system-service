package ru.pstu.poll_system_service.data.enums;

import lombok.Getter;

import java.util.List;

@Getter
public enum StatusEnum {
    proposed, //ещё не рассмотренные админом
    active,
    planned, //принятые админом, но ещё не начатые(задать автомтический старт через какой-то планировщик задач)
    closed,
    returned;  // возвращённые для внесения измений в данные опроса

    static public List<String> getWorkStatus(){
        return List.of(planned.name(), active.name());
    }
}
