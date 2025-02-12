import { useContext } from 'react';
import { recommendations } from '../../utils/recommendations';
import { useNavigate } from 'react-router-dom';
import RecommendationCard from './RecommendationCard';
import { ThemeContext } from '../../Context/ThemeContext';

const routes = ["/copywrite", "/email", "/questions"];

const SimilarRecommendations = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div className={`p-6 rounded-2xl shadow-lg w-full  max-w-5xl mx-auto mt-10 transition-colors duration-300 
      ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"} 
      sm:mt-6 sm:w-[95%]`}
        >
            <h2 className="text-xl font-semibold">You Might Also Like</h2>
            <p className="text-gray-400 text-sm mb-4">
                Related Discoveries: Handpicked apps aligned with your current selection.
            </p>
            <div className="flex gap-4 overflow-x-auto">
                {recommendations.map((rec, index) => (
                    <div key={index} onClick={() => navigate(routes[index])} className="cursor-pointer min-w-[350px] h-[180px]">
                        <RecommendationCard {...rec} />
                    </div>
                ))}
            </div>
        
        </div>
    );
};

export default SimilarRecommendations;
