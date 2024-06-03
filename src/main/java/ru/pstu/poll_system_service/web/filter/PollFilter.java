package ru.pstu.poll_system_service.web.filter;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import ru.pstu.poll_system_service.data.model.Poll;

import java.lang.reflect.Field;
import java.util.*;

@Getter
public class PollFilter {
    private final List<Field> declaredFields;
    private final String sortableField;
    private final String direction;
    private final Specification<Poll> specification;
    private final boolean specificationIsEmpty;

    @Min(0)
    private final Long page;

    @Min(1)
    private final Long limit;

    public PollFilter(String sortableField, @Valid Long limit, @Valid Long page, Map<String, String> fieldValues) {
        this.declaredFields = Arrays.stream(Poll.class.getDeclaredFields()).toList();
        String resultSort;

        if (StringUtils.startsWithIgnoreCase(sortableField, "-")){
            resultSort = sortableField.substring(1);
            this.direction = "DESC";
        }else{
            resultSort = sortableField;
            this.direction = "ASC";
        }

        if (! StringUtils.hasText(sortableField)){
            resultSort = this.getDefaultSort();
        }else{
            String finalSort = resultSort;
            declaredFields.stream()
                    .filter(field -> field.getName().equals(finalSort))
                    .findFirst().orElseThrow(() -> new RuntimeException(
                            String.format("ОШИБКА: Запрашиваемого поля '%s' не существует!", finalSort)));
        }

        if (page == null){
            this.page = 0L;
        }
        else{
            this.page = page;
        }

        if (limit == null || limit == 0){
            this.limit = 10L;
        }else{
            this.limit = limit;
        }

        this.sortableField = resultSort;
        specification = getSpecification(fieldValues);
        specificationIsEmpty = fieldValues.isEmpty();
    }

    private String getDefaultSort() {
        return "name";
    }

    private Specification<Poll> getSpecification(Map<String, String> fieldValues) {
        List<String> fieldName = declaredFields.stream().map(Field::getName).toList();
        if (! new HashSet<>(fieldName).containsAll(fieldValues.keySet())){
            throw new IllegalArgumentException("Один или несколько из указанных параметров не существуют!");
        }

        return (Root<Poll> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction();
            if (!fieldValues.isEmpty()) {
                for (Map.Entry<String, String> entry : fieldValues.entrySet()) {
                    predicate = cb.and(predicate, cb.equal(root.get(entry.getKey()), entry.getValue()));
                }
            }

            return predicate;
        };
    }

    public Specification<Poll> idIn(Collection<Long> ids) {
        return (Root<Poll> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> root.get("id").in(ids);
    }
}
