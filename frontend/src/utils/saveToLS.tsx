export const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value));
  }
};
