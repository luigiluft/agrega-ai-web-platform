import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Circle, Diamond, Hexagon, Square, Triangle } from "lucide-react";

const TestimonialsSection = () => {
  const logos = [
    {
      icon: Circle,
      name: "Empresa 1",
      color: "text-blue-500",
    },
    {
      icon: Square,
      name: "Empresa 2",
      color: "text-purple-500",
    },
    {
      icon: Triangle,
      name: "Empresa 3",
      color: "text-green-500",
    },
    {
      icon: Diamond,
      name: "Empresa 4",
      color: "text-red-500",
    },
    {
      icon: Hexagon,
      name: "Empresa 5",
      color: "text-yellow-500",
    },
  ];

  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Empresas que confiam na Agrega AI
        </h2>
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {[...logos, ...logos].map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/3 md:basis-1/5"
                >
                  <div className="h-24 flex items-center justify-center p-4 group">
                    <div className="relative transition-all duration-300 ease-in-out transform group-hover:scale-110">
                      {React.createElement(logo.icon, {
                        className: `w-12 h-12 ${logo.color}`,
                        strokeWidth: 1.5,
                      })}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;