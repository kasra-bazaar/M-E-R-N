
import { useCallback, useEffect, useState } from "react";
let logoutTimer;
export default function useAuthLogic() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  

  const loginHandler = useCallback((uid, token, expirationDate) => {
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    setToken(token)
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      loginHandler(
        storedData.userId,
        storedData.token && new Date(storedData.expiration)
      );
    }
  }, [loginHandler]);

  const logOutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    
  }, []);


  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logOutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logOutHandler, tokenExpirationDate]);



  
  
  return { loginHandler, logOutHandler, token, userId };
}
