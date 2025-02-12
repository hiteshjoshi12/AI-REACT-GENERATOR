/* eslint-disable react/prop-types */
const RecommendationCard = ({ title, category, description, icon }) => {
  return (
    <div className="p-4 rounded-lg h-[114px] shadow-lg w-full max-w-sm sm:w-80 hover:bg-[#3F3F46] cursor-pointer transition duration-300">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="text-3xl bg-purple-500 text-white p-1 rounded">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg sm:text-base">
            {title}
          </h3>
          <p className="text-purple-400 text-sm">{category}</p>
        </div>
      </div>
      <p className="text-gray-400 mt-2 text-sm sm:text-xs">{description}</p>
    </div>
  );
};

export default RecommendationCard;