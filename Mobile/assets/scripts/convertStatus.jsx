export const convertStatus = (status) => {
    if(status === 'active')
    {
      return "Активен"
    } 
    else if (status === 'planned')
    {
      return 'Запланирован'
    }
    else
    {
      return 'Завершен'
    }
  }