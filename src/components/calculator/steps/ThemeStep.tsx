
import { motion } from "framer-motion";
import ThemeSelector from "../../theme/ThemeSelector";
import { Theme } from "../../theme/types";
import { themes } from "../../theme/themeData";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ThemeStepProps {
  selectedTheme: Theme | null;
  setSelectedTheme: (theme: Theme) => void;
}

const ThemeStep = ({ selectedTheme, setSelectedTheme }: ThemeStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Selecione o tema do seu e-commerce
      </h2>
      <Sheet>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                relative rounded-lg overflow-hidden border cursor-pointer
                ${selectedTheme?.id === theme.id ? 'ring-2 ring-orange-500' : 'hover:border-orange-300'}
                transition-all duration-300
              `}
              onClick={() => setSelectedTheme(theme)}
            >
              <div className="aspect-video relative">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
                  <p className="text-sm text-white/90">{theme.description}</p>
                </div>
              </div>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{theme.name}</SheetTitle>
                  <SheetDescription>{theme.description}</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Recursos Incluídos</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {theme.features.map((feature, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {theme.fullDescription && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Descrição Detalhada</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {theme.fullDescription}
                      </p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </motion.div>
          ))}
        </div>
      </Sheet>
    </div>
  );
};

export default ThemeStep;
