



import AICarousel from '@/pages/Homepage/AICarousel';
import SubscriptionSection from './SubscriptionSection';
import SimilarRecommendations from '@/components/SimilarRecomendations/SimilarRecommendations';

const Homepage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10 p-4 sm:p-6 md:p-8 lg:p-10">
      <AICarousel />
      <SimilarRecommendations />
      <SubscriptionSection />
    </div>
  );
};

export default Homepage;

// ------------------ AICarousel ------------------

// ------------------ SimilarRecommendations ------------------


// ------------------ SubscriptionSection ------------------
