import { useState, useContext } from "react";
import Header from "./components/Header/Header";
import { ThemeProvider, ThemeContext } from "./Context/ThemeContext";
import Main from "./components/Main/Main";
import { button_config } from "./utils/button_config";
import { Route, Routes } from "react-router-dom";
import Email from "./components/EmailGeneration/Email";
import ComingSoon from "./components/ComingSoon";
import Homepage from "./pages/Homepage/Homepage";
import LoginPopup from "./components/LoginPopup/LoginPopup";
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
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className={`font-[outfit] min-h-screen ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
      <Header setShowLogin={setShowLogin} />
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <LoginPopup setShowLogin={setShowLogin} />
        </div>
      )}
      <main>
        <Routes>
          <Route path="/" element= {<Homepage />}/>
          <Route path="/main" element={<Main menu={menu} setMenu={setMenu} selectedButton={selectedButton} />} />
          <Route path="/email" element={<Email />} />
          <Route path="/copywrite" element={<ComingSoon />} />
          <Route path="/questions" element={<ComingSoon />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
