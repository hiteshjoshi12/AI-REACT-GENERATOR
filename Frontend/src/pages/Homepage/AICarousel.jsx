import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  },
  {
    title: "React + Tailwind CSS AI Component Generator",
    description:
      "Unleash AI Power: Craft & Preview React+Tailwind Components! Code Smarter, Create Faster, Innovate Now!",
    image: carouselImg2,
  },
  {
    title: "Outline Generator AI",
    description:"Boost your productivity with the Outline Generator AI microapp. Create structured outlines effortlessly for your writing projects.",
    image: carouselImg3,
  },
  {
    title: "Penman",
    description: "Write anything using AI",
    image: carouselImg4,
  },
];

const AICarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[500px] overflow-hidden mt-16">
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Card key={index} className="min-w-full h-full  text-white">
            <CardContent className="absolute flex flex-col gap-4 h-full justify-center">
              <div className="flex flex-col justify-center absolute gap-6 ml-8">
                <h2 className="text-5xl w-[515px] font-bold">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </CardContent>
            <img src={slide.image} alt={slide.title}  className="rounded-lg h-full w-full"/>
          </Card>
        ))}
      </div>
      <Button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-400 p-2"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-400 p-2"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${
              current === index ? "bg-blue-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
export default AICarousel;