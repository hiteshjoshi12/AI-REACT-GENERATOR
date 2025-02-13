/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { storeContext } from "@/Context/StoreContext";
import { ThemeContext } from "@/Context/ThemeContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserId } = useContext(storeContext);
  const [currentState, setCurrentState] = useState("Signup");
   const { theme } = useContext(ThemeContext);
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
    const endpoint = currentState === "Login" ? "/api/users/login" : "/api/users/register";
    const newUrl = `${url}${endpoint}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        const { token, userId } = response.data;

        // Store token securely
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        // Update global state
        setToken(token);
        setUserId(userId);
        setShowLogin(false);
       toast.success(`Welcome ${data.name || "back"}!`);
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0  `}>
      <form
        onSubmit={onLogin}
        className={` w-full max-w-[400px] sm:max-w-[350px] md:max-w-[330px] p-6 rounded-lg shadow-lg flex flex-col gap-5 animate-fadeIn ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-4 cursor-pointer"
          />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          {currentState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#EB6915] text-white py-2 rounded text-base font-medium transition hover:bg-orange-600"
        >
          {currentState === "Signup" ? "Create account" : "Login"}
        </button>

        {/* Terms Checkbox */}
        {currentState === "Signup" && (
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            <p>
              By continuing, I agree to the{" "}
              <span className="font-medium cursor-pointer text-orange-600">
                terms of use & privacy policy
              </span>
              .
            </p>
          </div>
        )}

        {/* Toggle Login/Signup */}
        {currentState === "Login" ? (
          <p className="text-sm text-center">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Signup")}
              className="text-[#EB6915] font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-[#EB6915] font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
