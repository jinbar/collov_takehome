export const getFromLS = (key) => {
  let ls = [];
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || [];
      // global.localStorage.clear()
    } catch (e) {
      /*Ignore*/
      console.log(e)
    }
  }
  return ls;
};
