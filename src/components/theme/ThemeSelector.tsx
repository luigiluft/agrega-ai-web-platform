import { Theme } from "./types";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: Theme | null;
  onThemeSelect: (theme: Theme) => void;
}

const ThemeSelector = ({ themes, selectedTheme, onThemeSelect }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {themes.map((theme) => (
        <motion.div
          key={theme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onThemeSelect(theme)}
        >
          <Card
            className={`
              cursor-pointer overflow-hidden transition-all duration-300
              ${selectedTheme?.id === theme.id 
                ? 'ring-2 ring-orange-500 shadow-lg' 
                : 'hover:shadow-md'}
            `}
          >
            <div className="aspect-video relative overflow-hidden">
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
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Recursos</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {theme.features.slice(0, 4).map((feature, index) => (
                    <li 
                      key={index}
                      className="text-xs text-gray-500 flex items-center gap-1"
                    >
                      <div className="w-1 h-1 bg-orange-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ThemeSelector;