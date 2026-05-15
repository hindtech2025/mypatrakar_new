export const safeLocalStorage = {
  set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
    //   console.warn("localStorage set failed:", e);
      return false;
    }
  },

  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
    //   console.warn("localStorage get failed:", e);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
    //   console.warn("localStorage remove failed:", e);
      return false;
    }
  }
};
