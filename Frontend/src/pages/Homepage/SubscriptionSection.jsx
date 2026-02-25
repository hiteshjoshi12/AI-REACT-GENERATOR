import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const SubscriptionSection = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div
        className={`flex flex-col lg:flex-row items-center justify-between gap-10 p-8 md:p-12 rounded-3xl border transition-all duration-500 ${
          isDark
            ? "bg-[#09090B] border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "bg-white border-slate-200 shadow-xl"
        }`}
      >
        {/* Left Side: Newsletter Content */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Stay in the loop
          </h2>
          <p className={`text-lg max-w-md mx-auto lg:mx-0 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            Join our engineering newsletter for the latest AI microapp updates and tech insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 max-w-md mx-auto lg:mx-0">
            <div className="relative w-full">
              <Input
                placeholder="Enter your email"
                className={`h-12 w-full rounded-xl pl-4 pr-12 transition-all ${
                  isDark 
                    ? "bg-white/5 border-white/10 text-white focus:ring-purple-500" 
                    : "bg-slate-100 border-slate-200 text-slate-900 focus:ring-purple-400"
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                 <Send size={18} />
              </div>
            </div>
            <Button className="h-12 px-8 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-transform active:scale-95 w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Right Side: Social Connect */}
        <div 
          className={`flex flex-col items-center justify-center p-8 rounded-2xl min-w-[280px] transition-all ${
            isDark ? "bg-white/5" : "bg-slate-50"
          }`}
        >
          <h3 className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
            Connect with us
          </h3>
          <div className="flex gap-6">
            <SocialLink 
              href="https://twitter.com" 
              icon={<Twitter />} 
              isDark={isDark} 
              hoverColor="hover:text-sky-400" 
            />
            <SocialLink 
              href="https://www.instagram.com/hiteshh_12/" 
              icon={<Instagram />} 
              isDark={isDark} 
              hoverColor="hover:text-pink-500" 
            />
            <SocialLink 
              href="https://www.linkedin.com/in/hitesh-joshi-0b868b227/" 
              icon={<Linkedin />} 
              isDark={isDark} 
              hoverColor="hover:text-blue-600" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for Social Links to keep code clean
const SocialLink = ({ href, icon, isDark, hoverColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`transition-all duration-300 transform hover:scale-125 ${
      isDark ? "text-slate-400" : "text-slate-500"
    } ${hoverColor}`}
  >
    {icon}
  </a>
);

export default SubscriptionSection;