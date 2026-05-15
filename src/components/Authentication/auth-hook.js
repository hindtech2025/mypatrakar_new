// import { useState, useEffect, useCallback, useRef } from "react";

// export const useAuth = () => {
//     const [token, setToken] = useState();
//     const [isLogin, setIsLogin] = useState(false);
//     const [userId, setUserId] = useState();
//     const [email, setEmail] = useState("");

//     const [tokenExpirationDate, setTokenExpirationDate] = useState();
//     const logOutTimer = useRef();
//     const login = useCallback((uid, token, expiresInDate) => {
//         setToken(token);
//         setUserId(uid);
//         setIsLogin(true);
//         const expirationDate = expiresInDate || new Date(new Date().getTime() + 1000 * 60 * 60);
//         setTokenExpirationDate(expirationDate);
//         localStorage.setItem(
//             "userData",
//             JSON.stringify({
//                 userId: uid,
//                 token: token,
//                 expiration: expirationDate.toISOString(),
//             })
//         );
//     }, []);

//     const logout = useCallback(() => {
//         setToken(null);
//         setTokenExpirationDate(null);
//         setUserId(null);
//         setIsLogin(false);
//         localStorage.removeItem("userData");
//         if (logOutTimer.current) {
//             clearTimeout(logOutTimer.current);
//         }
//     }, []);

//     useEffect(() => {
//         if (token && tokenExpirationDate) {
//             const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
//             logOutTimer.current = setTimeout(logout, remainingTime);
//         } else {
//             if (logOutTimer.current) {
//                 clearTimeout(logOutTimer.current);
//             }
//         }
//     }, [token, logout, tokenExpirationDate]);

//     useEffect(() => {
//         const storedData = JSON.parse(localStorage.getItem("userData"));
//         if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
//             login(storedData.userId, storedData.token, new Date(storedData.expiration));
//         }
//     }, [login, isLogin, token, userId]);
//     useEffect(() => {
//         let login = JSON.parse(localStorage.getItem("userData"));
//         if (login && login.token && new Date(login.expiration) > new Date()) {
//             setIsLogin(true);
//         }
//     }, [isLogin]);

//     return { isLogin, login, logout, token, userId, email, setEmail };
// };




import { useState, useEffect, useCallback, useRef } from "react";
import { safeLocalStorage } from "../../utils/localStorage";

export const useAuth = () => {
  const [token, setToken] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");

  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const logOutTimer = useRef();

  const login = useCallback((uid, token, expiresInDate) => {
    setToken(token);
    setUserId(uid);
    setIsLogin(true);

    const expirationDate =
      expiresInDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(expirationDate);

    safeLocalStorage.set(
      "userData",
      JSON.stringify({
        userId: uid ?? null,
        token: token ?? null,
        expiration: expirationDate.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setIsLogin(false);

    safeLocalStorage.remove("userData");

    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }
  }, []);

  // auto logout on token expiry
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logOutTimer.current = setTimeout(logout, remainingTime);
    } else {
      if (logOutTimer.current) {
        clearTimeout(logOutTimer.current);
      }
    }
  }, [token, logout, tokenExpirationDate]);

  // auto login from storage (SAFE)
  useEffect(() => {
    let storedData = null;

    try {
      const raw = safeLocalStorage.get("userData");
      if (raw) {
        storedData = JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Invalid userData:", e);
    }

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
      );
    }
  }, [login]);

  // login flag restore (SAFE)
  useEffect(() => {
    let loginData = null;

    try {
      const raw = safeLocalStorage.get("userData");
      if (raw) {
        loginData = JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Invalid login data:", e);
    }

    if (
      loginData &&
      loginData.token &&
      new Date(loginData.expiration) > new Date()
    ) {
      setIsLogin(true);
    }
  }, []);

  return {
    isLogin,
    login,
    logout,
    token,
    userId,
    email,
    setEmail,
  };
};
