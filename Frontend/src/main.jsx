import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/Context/ThemeContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  </BrowserRouter>
);
