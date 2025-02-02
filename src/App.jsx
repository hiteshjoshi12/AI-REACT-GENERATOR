import { useState } from "react";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./components/Context/ThemeContext";
import Main from "./components/Main/Main";
import { button_config } from "./utils/button_config";

const App = () => {
  const [menu, setMenu] = useState("Web");
  const selectedButton = button_config.find((btn) => btn.name === menu);

  return (
    <ThemeProvider>
      <div className="font-[outfit] bg-black min-h-screen" data-theme="light">
        <Header />
        <Main menu={menu} setMenu={setMenu} selectedButton={selectedButton} />
      </div>
    </ThemeProvider>
  );
};

export default App;
