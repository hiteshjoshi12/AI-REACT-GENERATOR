import { useState, useContext } from "react";
import Header from "./components/Header/Header";
import { ThemeProvider, ThemeContext } from "./components/Context/ThemeContext";
import Main from "./components/Main/Main";
import { button_config } from "./utils/button_config";

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

const ThemedApp = () => {
  const [menu, setMenu] = useState("Web");
  const selectedButton = button_config.find((btn) => btn.name === menu);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`font-[outfit] min-h-screen ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
      <Header />
      <Main menu={menu} setMenu={setMenu} selectedButton={selectedButton} />
    </div>
  );
};

export default App;
