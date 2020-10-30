export const saveToLS = (layout) => {
  if (global.localStorage) {
    global.localStorage.setItem("rgl-8", JSON.stringify(layout));
  }
};
