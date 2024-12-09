import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Theme } from "./types";

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
            transform: `translateY(${index * -380}px)`,
            zIndex: totalThemes - index,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="absolute w-full transition-all duration-500 hover:!translate-y-0 hover:!scale-100 group cursor-pointer"
        >
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-500 hover:scale-105">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-3">{theme.name}</h3>
                  <p className="text-white/90 text-base mb-4">{theme.description}</p>
                  <ul className="space-y-2">
                    {theme.features.map((feature, index) => (
                      <li key={index} className="text-white/80 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl">
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
              className="w-full rounded-lg object-cover aspect-video"
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
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-6">
            <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Escolher este tema
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};