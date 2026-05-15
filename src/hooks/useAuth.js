import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [token, setToken] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [purchaseId, setPurchaseId] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
// const navigate=useNavigate();
  const logOutTimer = useRef();

  const login = useCallback((uid, token, expiresInDate, email, name, purchaseId) => {
    const expirationDate = expiresInDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    const userData = {
      userId: uid,
      token,
      expiration: expirationDate.toISOString(),
      email,
      name,
      purchaseId,
    };

    setToken(token);
    setUserId(uid);
    setIsLogin(true);
    setTokenExpirationDate(expirationDate);
    setEmail(email || "");
    setName(name || "");
    setPurchaseId(purchaseId || "");

    sessionStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setIsLogin(false);
    setEmail("");
    setName("");
    setPurchaseId("");

    sessionStorage.removeItem("userData");
// navigate("/login")
    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logOutTimer.current = setTimeout(logout, remainingTime);
    } else if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
        storedData.email,
        storedData.name,
        storedData.purchaseId
      );
    }
  }, [login]);

  return {
    isLogin,
    login,
    logout,
    token,
    userId,
    email,
    name,
    purchaseId,
    setEmail,
  };
};
