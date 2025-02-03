import { Step } from "@/types/calculator-steps";

interface StepProgressProps {
  currentStep: Step;
  steps: Array<{ step: Step; label: string }>;
}

const StepProgress = ({ currentStep, steps }: StepProgressProps) => {
  return (
    <div className="flex justify-between items-center mb-12 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
      {steps.map(({ step, label }, index) => (
        <div key={step} className="flex flex-col items-center gap-2 bg-white p-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors duration-300
              ${currentStep === step
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                : "bg-gray-100 text-gray-600"
              }`}
          >
            {index + 1}
          </div>
          <span className="text-sm font-medium text-gray-600">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;