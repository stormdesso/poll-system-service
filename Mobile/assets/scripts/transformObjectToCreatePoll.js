import {CyclicalState} from "../Data/CyclicalState"
import {CyclicalType} from "../Data/CyclicalType"

export const transformObjectToCreatePoll = (inputData) => {

    const [day1, month1, year1] = inputData.startDate.split('.');
    const start = new Date(`${year1}-${month1}-${day1}T00:00:00.000Z`);
    const isoStringStart = start.toISOString();

    const [day2, month2, year2] = inputData.endDate.split('.');
    const end = new Date(`${year2}-${month2}-${day2}T00:00:00.000Z`);
    const isoStringEnd = end.toISOString();

    return {
        addressId: 1, // Примерное значение для addressId, так как оно отсутствует в исходном объекте
        cyclical: CyclicalState[inputData.cyclical],
        description: inputData.description,
        pollValues: inputData.newPollValue.filter(value => value !== ""), // Фильтруем пустые значения
        name: inputData.name,
        startDate: isoStringStart, // Преобразуем в ISO строку
        endDate: isoStringEnd, // Преобразуем в ISO строку
        maxNumberAnswersByUser: parseInt(inputData.maxNumberAnswersByUser, 10) || 1, // Преобразуем в число
        scheduleType: CyclicalType[inputData.cyclical]
    }
    
  };