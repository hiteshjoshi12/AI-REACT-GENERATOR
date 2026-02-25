import { Languages, Sun, Moon, Target, X, Menu, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "@/Context/StoreContext";
import { toast } from "react-toastify";

const Header = ({ setShowLogin }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token, setToken } = useContext(storeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully.");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-300 border-b ${
        isDark 
          ? "bg-[#09090B]/80 border-white/10 backdrop-blur-md text-white" 
          : "bg-white/80 border-slate-200 backdrop-blur-md text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="group flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-600 group-hover:bg-purple-500 transition-colors">
                <Target size={28} className="text-white" />
              </div>
              <span className="hidden sm:block font-bold text-xl tracking-tight">AI MicroApp</span>
            </Link>
          </div>

          {/* Central Tagline (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center flex-1 justify-center px-8">
            <p className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
              isDark 
                ? "bg-white/5 border-white/10 text-slate-400" 
                : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              Home. Where the <span className="text-purple-500 font-bold">AI magic</span> happens.
            </p>
          </div>

          {/* Actions Area */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
              <HeaderIconButton icon={<Languages size={18} />} />
              <HeaderIconButton 
                onClick={toggleTheme} 
                icon={isDark ? <Sun size={18} /> : <Moon size={18} />} 
              />
            </div>

            {/* Auth Button */}
            <div className="hidden md:block ml-2">
              {token ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm active:scale-95 ${
                    isDark 
                      ? "bg-white text-black hover:bg-slate-200" 
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className={`md:hidden border-t animate-in slide-in-from-top duration-300 ${
          isDark ? "bg-[#09090B] border-white/10" : "bg-white border-slate-200"
        }`}>
          <div className="flex flex-col p-4 gap-4">
            <div className="flex justify-around py-2 border-b border-white/5 mb-2">
                <HeaderIconButton onClick={toggleTheme} icon={isDark ? <Sun size={18} /> : <Moon size={18} />} />
                <HeaderIconButton icon={<Languages size={18} />} />
            </div>
            
            {token ? (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-red-500/10 text-red-500"
              >
                <LogOut size={20} /> Logout
              </button>
            ) : (
              <button
                onClick={() => { setShowLogin(true); setMenuOpen(false); }}
                className={`w-full py-4 rounded-xl font-bold ${
                  isDark ? "bg-white text-black" : "bg-slate-900 text-white"
                }`}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Sub-component for clean buttons
const HeaderIconButton = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center rounded-xl transition-all hover:bg-slate-500/10 border border-transparent active:scale-90"
  >
    {icon}
  </button>
);

export default Header;