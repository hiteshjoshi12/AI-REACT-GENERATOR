/* eslint-disable react/prop-types */
const RecommendationCard = ({ title, category, description, icon }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-80 h-[150px] hover:bg-[#3F3F46] cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-orange-500 text-white p-2 rounded">
            {icon}
          </div>
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-blue-400 text-sm">{category}</p>
          </div>
        </div>
      <p className="text-gray-400 mt-2 text-sm">{description}</p>
    </div>
  );
};

export default RecommendationCard;
