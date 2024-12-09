import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Theme } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ThemeCardProps {
  theme: Theme;
  index: number;
  totalThemes: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ThemeCard = ({ theme, index, totalThemes, isSelected, onSelect, onNext, onPrevious }: ThemeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => {
    onSelect(theme.id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isSelected 
              ? 'opacity-100 translate-y-0 z-10' 
              : 'opacity-0 translate-y-4 -z-10'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
            <div className="relative h-full overflow-hidden">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{theme.name}</h3>
                      <p className="text-white/90 text-base mb-4 max-w-lg">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white/80 text-sm font-medium mb-2">Recursos Principais</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {theme.features.map((feature, index) => (
                          <li 
                            key={index} 
                            className="text-white/80 text-sm flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Navigation Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
              <button
                onClick={(e) => { e.stopPropagation(); onPrevious(); }}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalThemes }).map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); onSelect(i + 1); }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === i 
                        ? 'bg-white w-4' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Theme Number Indicator */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm text-sm">
              Tema {index + 1} de {totalThemes}
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl bg-white/95 backdrop-blur-lg">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{theme.name}</SheetTitle>
          <SheetDescription className="text-base text-gray-600">
            {theme.description}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div>
            <img
              src={theme.image}
              alt={theme.name}
              className="w-full rounded-lg object-cover aspect-video shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Descrição Completa</h3>
            <p className="text-gray-600">{theme.fullDescription}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Recursos</h3>
            <ul className="space-y-2">
              {theme.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-2 text-gray-600"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-6">
            <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              Escolher este tema
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};