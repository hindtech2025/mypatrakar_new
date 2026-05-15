export const safeSessionStorage = {
  set(key, value) {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch (e) {
    //   console.warn("sessionStorage set failed:", e);
      return false;
    }
  },

  get(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
    //   console.warn("sessionStorage get failed:", e);
      return null;
    }
  },

  remove(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (e) {
    //   console.warn("sessionStorage remove failed:", e);
      return false;
    }
  },

  clear() {
    try {
      sessionStorage.clear();
      return true;
    } catch (e) {
    //   console.warn("sessionStorage clear failed:", e);
      return false;
    }
  }
};
