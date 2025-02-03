import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Step } from "@/types/calculator-steps";

interface StepNavigationProps {
  currentStep: Step;
  onNext: () => void;
}

const StepNavigation = ({ currentStep, onNext }: StepNavigationProps) => {
  if (currentStep === "contract") return null;

  return (
    <div className="flex justify-end mt-8">
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