import { createContext, useEffect, useState } from "react";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://ai-powered-microapps-suite.onrender.com";
  
  // 1. Get initial values immediately
  const initialToken = localStorage.getItem("token") || "";
  const initialUserId = localStorage.getItem("userId") || "";

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  
  /** * 2. Optimization: If we found a token in localStorage instantly, 
   * we don't strictly need to "wait" for the useEffect check. 
   * We set isCheckingAuth to false if a token exists right away.
   */
  const [isCheckingAuth, setIsCheckingAuth] = useState(!initialToken);

  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (storedToken) {
        setToken(storedToken);
        setUserId(storedUserId);
      }
      // Finish the "Checking" state
      setIsCheckingAuth(false);
    };
    
    initAuth();
  }, []); 

  const ContextValue = {
    url,
    token,
    setToken,
    userId,
    setUserId,
    isCheckingAuth, 
  };

  return (
    <storeContext.Provider value={ContextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;