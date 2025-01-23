import { motion } from "framer-motion";
import ThemeSelector from "../../theme/ThemeSelector";
import { Theme } from "../../theme/types";
import { themes } from "../../theme/themeData";

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
      <ThemeSelector
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeSelect={setSelectedTheme}
      />
    </div>
  );
};

export default ThemeStep;