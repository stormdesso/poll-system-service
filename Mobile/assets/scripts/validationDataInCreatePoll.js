export default function validationDataInCreatePoll(data) {
    let errorStatus = {
        name: false,
        description: false,
        startDate: false,
        endDate: false, 
        cyclical: false,
        cyclicalType: false,
        cyclicalDayPeriod: false,
        maxNumberAnswersByUser: false,
        newPollValue: false
    };
    let errorText = "";
  
    const changeErrorStatus = (key, isError) => {
      errorStatus[key] = isError;
    };

    let error = false;
    for (const [key, value] of Object.entries(data)) {
        console.log("key: ", key, "value: ", value)
        if (value === "" || value === "0" || value[0] === '') {
            if((key==="cyclicalType" && data.cyclical === "Опрос циклический")
            || (key==="cyclicalDayPeriod" && data.cyclicalType === "Personal")
            || (key === "maxNumberAnswersByUser" && data.maxNumberAnswersByUser === 0))
            {
                error = true;
                changeErrorStatus(key, true);
            }
            else if((key==="cyclicalType" && data.cyclical === "")
            || (key==="cyclicalType" && data.cyclical === "Опрос не циклический")
            || (key==="cyclical" && data.cyclical === "")
            || (key==="cyclicalDayPeriod" && data.cyclicalType !== "Пользовательский"))
            {
                changeErrorStatus(key, false);
            }
            else
            {
                error = true;
                changeErrorStatus(key, true);
            }
        } else {
        changeErrorStatus(key, false);
        }
    }
    if(error === true)
    {
        errorText = "Заполнены не все обязательные поля"
        return [errorStatus, errorText];
    }
    else
    {
        if(data.maxNumberAnswersByUser > data.newPollValue.length-1)
        {
            error = true
            changeErrorStatus("maxNumberAnswersByUser", true);
            errorText = "Максимальное количество вариантов для выбора больше чем вариантов"
            return [errorStatus, errorText];
        }
        else
        {
            if(data.startDate >= data.endDate)
            {
                error = true
                changeErrorStatus("startDate", true);
                changeErrorStatus("endDate", true);
                errorText = "Дата начала опроса не может быть раньше даты окончания"
                return [errorStatus, errorText];
            } 
            else
            {
                errorText = ""
                return [errorStatus, errorText];
            }
        }
    }
    
}