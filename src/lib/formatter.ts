// padrao de entrada data: 2023-10-30
// padrao de saida data: qui., 30/10/2023
export const formatDateStringToString = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(dateObj)
  return formattedDate
}

export const formatDateToString = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date)
  return formattedDate
}