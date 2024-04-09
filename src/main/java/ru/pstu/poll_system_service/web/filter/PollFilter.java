package ru.pstu.poll_system_service.web.filter;

import lombok.Getter;
import org.springframework.util.StringUtils;
import ru.pstu.poll_system_service.data.model.Poll;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Getter
public class PollFilter{
    private final List<Field> declaredFields;
    private final String sortableField;
    private final String direction;

    @Min(0)
    private final Long page;

    @Min(1)
    private final Long limit;

    public PollFilter(String sortableField, @Valid Long limit, @Valid Long page){
        this.declaredFields = Arrays.stream(Poll.class.getDeclaredFields()).toList();

        if (StringUtils.startsWithIgnoreCase(sortableField, "-")) {
            this.sortableField = sortableField.substring(1);
            this.direction = "DESC";
        } else {
            this.sortableField = sortableField;
            this.direction = "ASC";
        }

        if (!StringUtils.hasText(sortableField) || Objects.isNull(sortableField)) {
            sortableField = this.getDefaultSort();
        }
        else{
            String finalSort = sortableField;
            declaredFields.stream()
                    .filter( field -> field.getName().equals(finalSort))
                    .findFirst().orElseThrow( () ->  new RuntimeException(
                            String.format("ОШИБКА: Запрашиваемого поля '%s' не существует!", this.sortableField)));
        }

//        if (page != null && page < 0) {
//            throw new IllegalArgumentException("ОШИБКА: запрашиваемый номер страницы не может быть меньше 0!");
//        } else if (limit != null && limit < 0) {
//            throw new IllegalArgumentException("ОШИБКА: количество элементов на странице не может быть меньше 0!");
//        } else {
            if(page == null){
                this.page = 0L;
            }
            else{
                this.page = page;
            }

            if(limit == null || limit == 0){
                this.limit = 10L;
            }
            else{
                this.limit = limit;
            }
    }

    private String getDefaultSort(){
        return "name";
    }

}
