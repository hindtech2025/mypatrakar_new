import { useCallback } from "react";

export const useSessionStorage = () => {
  // Save data
  const setSessionData = useCallback((key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      sessionStorage.setItem(key, jsonValue);
    } catch (error) {
      // console.error("Error saving to sessionStorage:", error);
    }
  }, []);
  // Get data
  const getSessionData = useCallback((key) => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      // console.error("Error reading from sessionStorage:", error);
      return null;
    }
  }, []);

  // Remove data
  const removeSessionData = useCallback((key) => {
    sessionStorage.removeItem(key);
  }, []);

  return {
    setSessionData,
    getSessionData,
    removeSessionData,
  };
};
