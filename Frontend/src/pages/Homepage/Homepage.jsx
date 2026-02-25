import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/Context/ThemeContext";
import AICarousel from "@/pages/Homepage/AICarousel";
import SubscriptionSection from "./SubscriptionSection";
import SimilarRecommendations from "@/components/SimilarRecomendations/SimilarRecommendations";
import { Zap, Code, Layout, Globe } from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

const Homepage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className="relative w-full flex flex-col items-center gap-24 md:gap-32 lg:gap-40 py-10 overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${isDark ? 'bg-purple-900' : 'bg-purple-200'}`} />
        <div className={`absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 ${isDark ? 'bg-blue-900' : 'bg-blue-200'}`} />
      </div>

      {/* --- 1. HERO CAROUSEL --- */}
      <motion.section {...fadeInUp} className="w-full">
        <AICarousel />
      </motion.section>

      {/* --- 2. STATS SECTION (Fills the 'Empty' feeling) --- */}
      <motion.section 
        {...fadeInUp}
        className={`w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12 border-y ${
          isDark ? "border-white/5 bg-white/[0.02]" : "border-slate-200 bg-slate-50/50"
        } rounded-3xl`}
      >
        <StatItem value="10k+" label="Active Users" isDark={isDark} />
        <StatItem value="500+" label="AI Components" isDark={isDark} />
        <StatItem value="12" label="Microapps" isDark={isDark} />
        <StatItem value="99.9%" label="Uptime" isDark={isDark} />
      </motion.section>

      {/* --- 3. FEATURES GRID (Explains the Product) --- */}
      <motion.section {...fadeInUp} className="w-full max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything you need to build faster</h2>
          <p className={isDark ? "text-slate-400" : "text-slate-500"}>Stop writing boilerplate code. Let AI handle the heavy lifting.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-yellow-500" />}
            title="Instant Generation"
            desc="Type your requirements and watch the code appear in seconds."
            isDark={isDark}
          />
          <FeatureCard 
            icon={<Code className="text-blue-500" />}
            title="Clean Tailwind CSS"
            desc="Standard, maintainable classes that fit right into your project."
            isDark={isDark}
          />
          <FeatureCard 
            icon={<Layout className="text-purple-500" />}
            title="Real-time Preview"
            desc="See exactly what your component looks like before you copy the code."
            isDark={isDark}
          />
        </div>
      </motion.section>

      {/* --- 4. RECOMMENDATIONS --- */}
      <motion.section {...fadeInUp} className="w-full">
        <SimilarRecommendations />
      </motion.section>

      {/* --- 5. SUBSCRIPTION --- */}
      <motion.section {...fadeInUp} className="w-full max-w-5xl mx-auto px-6 mb-20">
        <SubscriptionSection />
      </motion.section>

    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatItem = ({ value, label, isDark }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-1">{value}</div>
    <div className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
      {label}
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc, isDark }) => (
  <div className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl ${
    isDark ? "bg-[#121214] border-white/5 hover:border-white/10" : "bg-white border-slate-100 hover:border-slate-200"
  }`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
      {icon}
    </div>
    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
  </div>
);

export default Homepage;