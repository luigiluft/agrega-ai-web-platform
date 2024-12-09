import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Theme } from "./types";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
          className={`relative w-full transition-all duration-500 ${
            isSelected ? 'scale-100 z-50' : 'scale-95 opacity-0 pointer-events-none'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover object-top transform transition-transform duration-500"
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

            {/* Navigation Controls */}
            <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={(e) => { e.stopPropagation(); onPrevious(); }}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
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