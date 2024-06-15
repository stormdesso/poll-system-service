export const convertStatus = (status) => {
    if(status === 'active')
    {
      return "Активен"
    } 
    else if (status === 'planned')
    {
      return 'Запланирован'
    }
    else if (status === 'proposed')
    {
      return 'Предложен'
    }
    else if (status === 'returned')
    {
      return 'Возвращен'
    }
    else
    {
      return 'Завершен'
    }
  }