export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log("saving: " + value);
}

export function getFromStorage(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
  
}