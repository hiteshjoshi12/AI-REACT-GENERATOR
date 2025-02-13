import { ThemeContext } from "@/Context/ThemeContext";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useContext } from "react";
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className= {`text-[#d9d9d9] flex flex-col items-center gap-6 px-6 md:px-[8vw] py-8 mt-16 ${
        theme === "dark" ? "bg-[#09090B] text-white shadow-none" : "bg-gray-200 text-black shadow-gray-500"
      }`}
      id="footer"
    >
      {/* Grid Layout (Single Column on Mobile, Three Columns on Desktop) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
        {/* About Section */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          {/* <img src={assets.logo} alt="Logo" className="w-28" /> */}
          <p className="text-sm md:text-base leading-relaxed">
          Run all your work on one platform with specialized microapp that scale with your needs.
          </p>
          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start gap-4">
            <a
              className="w-8 cursor-pointer hover:scale-110 transition"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6  " />
            </a>
            <a
              className="w-8 cursor-pointer hover:scale-110 transition"
              href="https://www.instagram.com/hiteshh_12/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              className="w-8 cursor-pointer hover:scale-110 transition"
              href="https://www.linkedin.com/in/hitesh-joshi-0b868b227/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 " />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          <h2 className=" font-bold text-2xl">COMPANY</h2>
          <ul className="text-sm md:text-base">
            <li className="my-1 cursor-pointer hover:text-white transition">
              Help Center
            </li>
            <li className="my-1 cursor-pointer hover:text-white transition">
              Contact Us
            </li>
            <li className="my-1 cursor-pointer hover:text-white transition">
              FAQs
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          <h2 className="font-bold text-2xl">GET IN TOUCH</h2>
          <ul className="text-sm md:text-base">
            <li className="my-1 cursor-pointer hover:text-white transition">
              +91 9650122063
            </li>
            <li className="my-1 cursor-pointer hover:text-white transition">
              contact@me.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full h-[2px] bg-gray-500 border-none" />

      {/* Copyright */}
      <p className="text-sm text-center">© 2025 . All rights reserved.</p>
    </footer>
  );
};

export default Footer;
