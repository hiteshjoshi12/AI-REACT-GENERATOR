import { Search, Languages, Sun, Moon, Target, X } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={`w-full transition-colors duration-300 ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center p-4">
        <div>
          <Target size={40} />
        </div>
        <div className="flex items-center justify-center px-3 py-2 rounded-full text-lg font-semibold">
          <h1>Home. Where the AI magic of coding happens.</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center space-x-4">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <X size={18} className="z-10" /> : <Search size={18} />}
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
              <Languages size={18} />
            </button>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-black" />}
            </button>
          </div>
          <button className="border-2 px-6 py-2 rounded-full text-lg font-semibold cursor-pointer 
            border-black bg-white text-black hover:bg-gray-300 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700">
            Log In
          </button>
          <button className="border-2 px-6 py-2 rounded-full text-lg font-semibold cursor-pointer 
            border-black bg-white text-black hover:bg-gray-300 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700">
            Sign Up
          </button>
        </div>
      </div>
      {showSearch && (
        <div className="flex justify-center p-4 absolute top-2 right-[400px] z-0">
          <input 
            type="text" 
            placeholder="Search..." 
            className={`w-[250px] p-2 rounded-full border-2 border-gray-400 focus:outline-none focus:border-gray-500 transition-transform duration-300 ease-in-out ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"}`}
          />
        </div>
      )}
      <hr className="border-1 border-[#3F3F46]" />
    </div>
  );
};

export default Header;
