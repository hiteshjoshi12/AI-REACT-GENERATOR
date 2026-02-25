/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { ArrowUpRight } from 'lucide-react'; // Make sure lucide-react is installed

const RecommendationCard = ({ title, category, description, icon }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div 
      className={`
        group relative h-full w-full flex flex-col p-5 md:p-6 rounded-2xl border transition-all duration-300
        ${theme === "dark" 
          ? "bg-[#121214] border-white/5 hover:border-purple-500/50 shadow-lg shadow-black/40" 
          : "bg-white border-slate-200 hover:border-purple-400/50 shadow-sm hover:shadow-md"
        }
      `}
    >
      {/* Top Section: Icon & Header */}
      <div className="flex items-start gap-4 mb-4">
        
        {/* Modern Gradient Icon Box */}
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md">
          <span className="text-2xl">{icon}</span>
        </div>
        
        {/* Title & Category (with overflow protection) */}
        <div className="flex flex-col justify-center pt-0.5 overflow-hidden pr-6">
          <h3 className={`font-semibold text-base md:text-lg truncate tracking-tight ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {title}
          </h3>
          <p className="text-purple-500 dark:text-purple-400 font-semibold text-xs mt-0.5 uppercase tracking-wider">
            {category}
          </p>
        </div>
      </div>

      {/* Description Section */}
      <p className={`text-sm leading-relaxed line-clamp-3 flex-grow ${
        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
      }`}>
        {description}
      </p>

      {/* Subtle Hover Indicator (App Store Vibe) */}
      <div className={`absolute top-5 right-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 ${
        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
      }`}>
        <ArrowUpRight size={20} />
      </div>
    </div>
  );
};

export default RecommendationCard;