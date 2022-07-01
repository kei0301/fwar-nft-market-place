export const getItem = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
};
export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const clearItem = (key) => {
  localStorage.removeItem(key);
};
