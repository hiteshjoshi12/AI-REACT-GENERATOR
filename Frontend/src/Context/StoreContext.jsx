import { createContext, useEffect, useState } from "react";
export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  // const url = "http://localhost:4000";
  const url = "https://ai-powered-microapps-suite.onrender.com";
  
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userID");

      if (storedToken) {
        setToken(storedToken);
        setUserId(storedUserId);
      }
    }
    loadData();
  }, [token]);
  const ContextValue = {
    url,
    token,
    setToken,
    userId,
    setUserId,
  };
  return (
    <storeContext.Provider value={ContextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
