import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Ensure your image paths remain correct
import carouselImg1 from "../../assets/Homepage/carousel-2.8a3e5e2c.webp";
import carouselImg2 from "../../assets/Homepage/React+TailwindCSSAIComponentGenerator_notext.webp";
import carouselImg3 from "../../assets/Homepage/OutlineGeneratorAI_notext.webp";
import carouselImg4 from "../../assets/Homepage/Penman_notext.webp";

const slides = [
  {
    title: "Your go-to AI microapp platform",
    description:
      "Run all your work on one platform with specialized microapp that scale with your needs.",
    image: carouselImg1,
    link: "/",
  },
  {
    title: "React + Tailwind CSS AI Component Generator",
    description:
      "Unleash AI Power: Craft & Preview React+Tailwind Components! Code Smarter, Create Faster, Innovate Now!",
    image: carouselImg2,
    link: "/react-tailwind-generator",
  },
  {
    title: "Outline Generator AI",
    description:
      "Boost your productivity with the Outline Generator AI microapp. Create structured outlines effortlessly for your writing projects.",
    image: carouselImg3,
    link: "/questions",
  },
  {
    title: "Penman",
    description: "Write anything using AI",
    image: carouselImg4,
    link: "/questions",
  },
];

const AICarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl mt-8 mb-12">
      <div
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Link to={slide.link} key={index} className="min-w-full h-full block group">
            <Card className="min-w-full h-full border-0 rounded-none overflow-hidden relative cursor-pointer">
              
              {/* Background Image with Hover Zoom */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 object-cover h-full w-full transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center">
                
                {/* Text Content */}
                <CardContent className="p-0 px-8 md:px-16 flex flex-col gap-4 max-w-2xl relative z-10">
                  <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight drop-shadow-md tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg text-gray-200 line-clamp-3 md:line-clamp-none max-w-lg drop-shadow">
                    {slide.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Modern Glassmorphism Controls */}
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all shadow-lg p-0 flex items-center justify-center z-20"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all shadow-lg p-0 flex items-center justify-center z-20"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </Button>

      {/* Animated Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${
              current === index 
                ? "w-8 bg-white" 
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AICarousel;