import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Theme } from "./types";
import { ArrowRight } from "lucide-react";

interface ThemeCardProps {
  theme: Theme;
  index: number;
  totalThemes: number;
}

export const ThemeCard = ({ theme, index, totalThemes }: ThemeCardProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          style={{
            transform: `translateY(${index * 220}px)`,
            zIndex: totalThemes - index,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="absolute w-full transition-all duration-500 hover:-translate-x-4 hover:!translate-y-0 hover:!scale-105 group cursor-pointer"
        >
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 animate-fade-up">{theme.name}</h3>
                      <p className="text-white/90 text-base mb-4 animate-fade-up [animation-delay:100ms] max-w-lg">
                        {theme.description}
                      </p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 group/btn hover:bg-primary/90 transition-colors">
                      Ver detalhes
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="animate-fade-up [animation-delay:200ms]">
                      <h4 className="text-white/80 text-sm font-medium mb-2">Recursos Principais</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {theme.features.map((feature, index) => (
                          <li 
                            key={index} 
                            className="text-white/80 text-sm flex items-center gap-2 animate-slide-in"
                            style={{ animationDelay: `${(index + 1) * 100}ms` }}
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 animate-fade-up [animation-delay:300ms]">
                      <p className="text-white/70 text-sm italic">
                        {theme.fullDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl bg-white/95 backdrop-blur-lg">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold animate-fade-down">{theme.name}</SheetTitle>
          <SheetDescription className="text-base text-gray-600 animate-fade-down [animation-delay:100ms]">
            {theme.description}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div className="animate-scale-up">
            <img
              src={theme.image}
              alt={theme.name}
              className="w-full rounded-lg object-cover aspect-video shadow-lg"
            />
          </div>
          <div className="animate-fade-up [animation-delay:200ms]">
            <h3 className="text-lg font-semibold mb-3">Descrição Completa</h3>
            <p className="text-gray-600">{theme.fullDescription}</p>
          </div>
          <div className="animate-fade-up [animation-delay:300ms]">
            <h3 className="text-lg font-semibold mb-3">Recursos</h3>
            <ul className="space-y-2">
              {theme.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-2 text-gray-600 animate-slide-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-6 animate-fade-up [animation-delay:400ms]">
            <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              Escolher este tema
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};