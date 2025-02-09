import { Languages, Sun, Moon, Target, X, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`w-full transition-colors duration-300 ${
        theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/">
          <Target size={35} />
          </Link>
        </div>
        <div className="md:flex items-center justify-center md:ml-60 px-3 py-2 rounded-full text-sm md:text-lg font-semibold">
          <h1>Home. Where the AI magic of coding happens.</h1>
        </div>
        <div className="flex gap-4 items-center">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
              <Languages size={18} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-white" />
              ) : (
                <Moon size={18} className="text-black" />
              )}
            </button>
            <button className="border-2 px-6 py-2 rounded-full text-lg font-semibold cursor-pointer border-black bg-white text-black hover:bg-gray-300 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700">
              Log In
            </button>
            <button className="border-2 px-6 py-2 rounded-full text-lg font-semibold cursor-pointer border-black bg-white text-black hover:bg-gray-300 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col items-center py-4 gap-4 ${
            theme === "dark" ? "bg-[#09090B]" : "bg-white"
          }`}
        >
          <button className="border-2 px-6 py-2 rounded-full text-lg font-semibold cursor-pointer border-black bg-white text-black hover:bg-gray-300 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700">
            Log In
          </button>
          <button className="border-2 px-6 py-2 rounded-full text-lg font-semibold cursor-pointer border-black bg-white text-black hover:bg-gray-300 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700">
            Sign Up
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-white" />
            ) : (
              <Moon size={18} className="text-black" />
            )}
          </button>
        </div>
      )}

      <hr className="border-1 border-[#3F3F46]" />
    </div>
  );
};

export default Header;
