export const formatDate = (date) => {
  const newDate = new Date(date);
  const [month, day, year] = [newDate.getMonth(), newDate.getDate(), newDate.getFullYear()];
  const [hour, minutes, seconds] = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
  // return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  return newDate.getMonth();
};
