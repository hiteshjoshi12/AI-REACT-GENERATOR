import { useState, useContext } from "react";
import Header from "./components/Header/Header";
import { ThemeProvider, ThemeContext } from "./components/Context/ThemeContext";
import Main from "./components/Main/Main";
import { button_config } from "./utils/button_config";
import { Route, Routes } from "react-router-dom";
import Email from "./components/EmailGeneration/Email";
import ComingSoon from "./components/ComingSoon";
// import SimilarRecommendations from "./components/SimilarRecomendations/SimilarRecommendations";

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

const ThemedApp = () => {
  const [menu, setMenu] = useState("HTML");
  const selectedButton = button_config.find((btn) => btn.name === menu);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`font-[outfit] min-h-screen ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main menu={menu} setMenu={setMenu} selectedButton={selectedButton} />} />
          <Route path="/email" element={<Email />} />
          <Route path="/copywrite" element={<ComingSoon />} />
          <Route path="/questions" element={<ComingSoon />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
