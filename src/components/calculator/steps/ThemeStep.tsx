
import { motion } from "framer-motion";
import ThemeSelector from "../../theme/ThemeSelector";
import { Theme } from "../../theme/types";
import { themes } from "../../theme/themeData";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              group relative rounded-lg overflow-hidden border cursor-pointer bg-white
              ${selectedTheme?.id === theme.id ? 'ring-2 ring-orange-500' : 'hover:border-orange-300'}
              transition-all duration-300 hover:shadow-lg
            `}
          >
            <div 
              className="aspect-video relative"
              onClick={() => setSelectedTheme(theme)}
            >
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-4 space-y-2">
                <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
                <p className="text-sm text-white/90">{theme.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {theme.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <a 
                href={theme.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Button 
                  variant="outline" 
                  className="w-full gap-2 hover:bg-orange-50"
                >
                  <ExternalLink className="w-4 h-4" />
                  Acessar Demo
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ThemeStep;
