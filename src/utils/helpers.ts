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