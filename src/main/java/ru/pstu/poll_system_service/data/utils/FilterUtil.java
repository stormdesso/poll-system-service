package ru.pstu.poll_system_service.data.utils;

import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class FilterUtil{

    public static String formatSortingField(String sortingField){
        String sortOrder = getSortDirection(sortingField);

        if(sortOrder.equals("desc")){
            sortingField = sortingField.substring(1);
        }
        return sortingField;
    }

    public static String getSortDirection(String sortingField){
        return sortingField.charAt(0) == '-'? "desc": "asc";
    }

    //  todo:для валидации
    public static List<String> getFieldNames(Class<?> clazz) {
        List<String> fieldNames = new ArrayList<>();

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            fieldNames.add(field.getName());
        }

        return fieldNames;
    }

    //  todo:catch exception + log
    public static void validateFields(String sortingField ,List<String> fields){
        if(!fields.contains(sortingField)){
            throw new IllegalArgumentException();
        }
    }

    //  todo:для валидации
    public static void validateParameters(String fieldName, Long limit, Long page){
        if(!StringUtils.hasText(fieldName)){

        }
    }

}
