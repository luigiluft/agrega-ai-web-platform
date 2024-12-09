import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TestimonialsSection = () => {
  const logos = [
    {
      src: "/lovable-uploads/cosmeticos-beauty-logo.png",
      alt: "Cosméticos Beauty Logo",
    },
    {
      src: "/lovable-uploads/fashion-store-logo.png",
      alt: "Fashion Store Logo",
    },
    {
      src: "/lovable-uploads/tech-gadgets-logo.png",
      alt: "Tech Gadgets Logo",
    },
    {
      src: "/lovable-uploads/alcance-jeans-logo.png",
      alt: "Alcance Jeans Logo",
    },
    {
      src: "/lovable-uploads/movability-logo.png",
      alt: "Movability Logo",
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Empresas que confiam na Agrega AI
        </h2>
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {logos.map((logo, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                  <div className="h-24 flex items-center justify-center p-4">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                    />
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