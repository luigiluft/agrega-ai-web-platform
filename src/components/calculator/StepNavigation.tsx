
import { Button } from "../ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Step } from "@/types/calculator-steps";

interface StepNavigationProps {
  currentStep: Step;
  onNext: () => void;
  onPrevious: () => void;
}

const StepNavigation = ({ currentStep, onNext, onPrevious }: StepNavigationProps) => {
  if (currentStep === "contract") return null;

  return (
    <div className="flex justify-between mt-8">
      {currentStep !== "platform" && (
        <Button
          onClick={onPrevious}
          className="bg-white text-primary border-2 border-primary hover:bg-primary/5 px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      )}
      <div className="flex-1" />
      <Button
        onClick={onNext}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        Próximo
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default StepNavigation;
