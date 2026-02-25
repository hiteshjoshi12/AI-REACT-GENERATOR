/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { X, Mail, Lock, User, Loader2 } from "lucide-react"; // Added Loader2
import axios from "axios";
import { toast } from "react-toastify";
import { storeContext } from "@/Context/StoreContext";
import { ThemeContext } from "@/Context/ThemeContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserId } = useContext(storeContext);
  const [currentState, setCurrentState] = useState("Signup");
  const [isLoading, setIsLoading] = useState(false); // New Loading State
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    const endpoint = currentState === "Login" ? "/api/users/login" : "/api/users/register";
    const newUrl = `${url}${endpoint}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        const { token, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setToken(token);
        setUserId(userId);
        setShowLogin(false);
        toast.success(currentState === "Login" ? "Welcome back!" : "Account created!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Connection error. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <form
      onSubmit={onLogin}
      className={`w-full max-w-[400px] p-8 rounded-3xl shadow-2xl flex flex-col gap-6 transform transition-all animate-in zoom-in-95 duration-300 border relative ${
        isDark 
          ? "bg-[#121214] border-white/10 text-white" 
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* Close Button - Disabled during loading to prevent accidental close */}
      <button 
        type="button"
        disabled={isLoading}
        onClick={() => setShowLogin(false)}
        className={`absolute top-5 right-5 p-1 rounded-full transition-colors ${
          isLoading ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-500/10"
        }`}
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          {currentState === "Login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {isLoading ? "Authenticating..." : "Please enter your details to continue."}
        </p>
      </div>

      {/* Input Fields */}
      <div className={`flex flex-col gap-3 transition-opacity duration-300 ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
        {currentState !== "Login" && (
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Full Name"
              required
              autoComplete="name"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
              } focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        )}
        
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email Address"
            required
            autoComplete="email"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
              isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
            } focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
              isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
            } focus:ring-2 focus:ring-purple-500`}
          />
        </div>
      </div>

      {/* Submit Button with Spinner */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2 ${
          isLoading ? "opacity-70 cursor-wait" : "hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{currentState === "Signup" ? "Sign Up" : "Sign In"}</span>
        )}
      </button>

      {/* Toggle Link */}
      {!isLoading && (
        <p className="text-sm text-center font-medium animate-in fade-in duration-500">
          {currentState === "Login" ? "New here?" : "Already a member?"}{" "}
          <span
            onClick={() => setCurrentState(currentState === "Login" ? "Signup" : "Login")}
            className="text-purple-500 hover:underline cursor-pointer ml-1"
          >
            {currentState === "Login" ? "Create an account" : "Log in"}
          </span>
        </p>
      )}
    </form>
  );
};

export default LoginPopup;