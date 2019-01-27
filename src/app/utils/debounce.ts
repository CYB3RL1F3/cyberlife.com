let dbnc = false;
/*
export const debounce = (func, duration) => {
  if (dbnc === false) {
    dbnc = true;
    setTimeout(() => {
      dbnc = false;
    }, duration);
    func();
  }
};*/

export const debounce = (func, duration) => (...args) => {
  if (dbnc === false) {
    dbnc = true;
    func(...args);
    setTimeout(() => {
      dbnc = false;
    }, duration);
  }
};
