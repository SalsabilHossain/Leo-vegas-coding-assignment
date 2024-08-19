export function debounce(callback, delay = 300) {
    let timerId; 
    return (...arg) => {
      clearTimeout(timerId); 
      timerId = setTimeout(() => {
        callback.apply(this, arg); 
      }, delay);
    };
  }
  