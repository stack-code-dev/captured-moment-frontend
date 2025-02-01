import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email)
}

export const getInitials = (name: string) => {
  if(!name) return "";

  const word = name.split(" ");
  let initial = "";

  for (let i = 0; i < Math.min(word.length, 2); i++) {
    initial += word[i][0];
  }

  return initial.toUpperCase()
}


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  return format(date, 'do MMM yyyy', {locale: enUS})
}