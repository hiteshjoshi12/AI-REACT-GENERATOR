
import AICarousel from '@/pages/Homepage/AICarousel'
import SubscriptionSection from './SubscriptionSection'
import SimilarRecommendations from '@/components/SimilarRecomendations/SimilarRecommendations'
const Homepage = () => {
  return (
    <div>
        <AICarousel />
        <SimilarRecommendations />
        <SubscriptionSection />
    </div>
  )
}

export default Homepage