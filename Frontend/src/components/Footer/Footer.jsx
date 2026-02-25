import { ThemeContext } from "@/Context/ThemeContext";
import { Twitter, Instagram, Linkedin, Target } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <footer
      className={`w-full mt-24 border-t transition-colors duration-500 ${
        isDark 
          ? "bg-[#09090B] border-white/10 text-slate-400" 
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
      id="footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="p-1.5 rounded-lg bg-purple-600">
                <Target size={24} className="text-white" />
              </div>
              <span className={`font-bold text-xl tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                AI MicroApp
              </span>
            </Link>
            <p className="text-sm md:text-base leading-relaxed max-w-sm">
              Empowering your workflow with specialized AI microapps. Build, code, and innovate on a single platform designed to scale with your needs.
            </p>
            {/* Social Icons */}
            <div className="flex gap-5">
              <SocialIcon href="https://twitter.com" icon={<Twitter size={20} />} isDark={isDark} />
              <SocialIcon href="https://instagram.com/hiteshh_12/" icon={<Instagram size={20} />} isDark={isDark} />
              <SocialIcon href="https://linkedin.com/in/hitesh-joshi-0b868b227/" icon={<Linkedin size={20} />} isDark={isDark} />
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-slate-900"}`}>
              Company
            </h2>
            <ul className="space-y-3">
              <FooterLink label="Help Center" />
              <FooterLink label="Contact Us" />
              <FooterLink label="FAQs" />
              <FooterLink label="Privacy Policy" />
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-slate-900"}`}>
              Get in Touch
            </h2>
            <div className="space-y-3">
              <p className={`text-sm transition-colors hover:text-purple-500 cursor-pointer`}>
                <span className="font-semibold block mb-1">WhatsApp:</span>
                +91 9650122063
              </p>
              <p className={`text-sm transition-colors hover:text-purple-500 cursor-pointer`}>
                <span className="font-semibold block mb-1">Email:</span>
                contact@me.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${
          isDark ? "border-white/5" : "border-slate-200"
        }`}>
          <p className="text-xs md:text-sm">
            © {new Date().getFullYear()} AI MicroApp. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs md:text-sm">
            <span className="cursor-pointer hover:underline">Terms</span>
            <span className="cursor-pointer hover:underline">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for Hover Links
const FooterLink = ({ label }) => (
  <li>
    <button className="text-sm transition-all duration-300 hover:text-purple-500 hover:translate-x-1">
      {label}
    </button>
  </li>
);

// Helper component for Social Icons
const SocialIcon = ({ href, icon, isDark }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full transition-all duration-300 ${
      isDark 
        ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white" 
        : "bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-900"
    }`}
  >
    {icon}
  </a>
);

export default Footer;