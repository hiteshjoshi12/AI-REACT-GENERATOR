import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./Context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreContextProvider>
  </BrowserRouter>
);
