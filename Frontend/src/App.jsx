import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Contexts
import { ThemeProvider, ThemeContext } from "./Context/ThemeContext";
import StoreContextProvider from "./Context/StoreContext";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Email from "./components/EmailGeneration/Email";
import ComingSoon from "./components/ComingSoon";
import Homepage from "./pages/Homepage/Homepage";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer/Footer";

// Config
import { button_config } from "./utils/button_config";

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

const ThemedApp = () => {
  const [menu, setMenu] = useState("HTML");
  const [showLogin, setShowLogin] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  const selectedButton = button_config.find((btn) => btn.name === menu);

  return (
    <>
      <ToastContainer theme={theme === "dark" ? "dark" : "light"} />

      <div
        className={`font-['Outfit',sans-serif] min-h-screen flex flex-col transition-colors duration-500 ease-in-out ${
          theme === "dark" 
            ? "bg-[#09090B] text-slate-100" 
            : "bg-slate-50 text-slate-900"
        }`}
      >
        <Header setShowLogin={setShowLogin} />

        {/* FIXED LOGIN OVERLAY */}
        {showLogin && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
            {/* The wrapper below ensures the child can take its full defined width */}
            <div className="w-full max-w-[450px] flex justify-center items-center">
               <LoginPopup setShowLogin={setShowLogin} />
            </div>
          </div>
        )}

        <main className="flex-grow w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-6">
          <StoreContextProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/react-tailwind-generator"
                element={
                  <ProtectedRoute>
                    <Main
                      menu={menu}
                      setMenu={setMenu}
                      selectedButton={selectedButton}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/email"
                element={
                  <ProtectedRoute>
                    <Email />
                  </ProtectedRoute>
                }
              />
              <Route path="/copywrite" element={<ComingSoon />} />
              <Route path="/questions" element={<ComingSoon />} />
            </Routes>
            <Footer />
          </StoreContextProvider>
        </main>
      </div>
    </>
  );
};

export default App;