const { log } = console;

export const setToSessionStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    log('Error in session storage', error);
  }
};
export const getFromSessionStorage = (key) => {
  if (sessionStorage.getItem(key)) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      return sessionStorage.getItem(key);
    }
  }
  return null;
};

export const removeFromSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

export const setToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    log('Error in local storage', error);
  }
};
export const getFromLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return localStorage.getItem(key);
    }
  }
  return null;
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const clearStorage = () => {
  clearSessionStorage();
  clearLocalStorage();
};
