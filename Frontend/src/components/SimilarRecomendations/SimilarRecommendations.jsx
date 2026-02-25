import { useContext } from 'react';
import { recommendations } from '../../utils/recommendations';
import { useNavigate } from 'react-router-dom';
import RecommendationCard from './RecommendationCard';
import { ThemeContext } from '../../Context/ThemeContext';

const routes = ["/react-tailwind-generator", "/email", "/questions"];

const SimilarRecommendations = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div 
            className={`w-full max-w-6xl mx-auto mt-12 mb-8 px-4 transition-colors duration-500 ease-in-out
                ${theme === "dark" ? "text-slate-100" : "text-slate-900"}
            `}
        >
            {/* Header Section */}
            <div className="mb-8 space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    You Might Also Like
                </h2>
                <p className={`text-sm md:text-base ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    Related Discoveries: Handpicked apps aligned with your current selection.
                </p>
            </div>

            {/* Scroll Container with Hide-Scrollbar and Scroll-Snapping */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {recommendations.map((rec, index) => (
                    <div 
                        key={index} 
                        onClick={() => navigate(routes[index])} 
                        className="group relative cursor-pointer shrink-0 snap-start w-[85vw] sm:w-[320px] md:w-[360px] transition-all duration-300 ease-out hover:-translate-y-2"
                        role="button"
                        aria-label={`Maps to ${rec.title || 'recommendation'}`}
                    >
                        {/* Glow/Shadow effect behind the card on hover */}
                        <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl ${
                            theme === "dark" ? "bg-white/10" : "bg-black/5"
                        }`} />
                        
                        {/* Ensure the actual card wrapper handles the background appropriately if it doesn't already */}
                        <div className="relative h-full w-full">
                            <RecommendationCard {...rec} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarRecommendations;