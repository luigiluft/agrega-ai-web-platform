import { Card } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface StepCardProps {
  step: {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    completed?: boolean;
  };
  isActive: boolean;
  children?: React.ReactNode;
}

const StepCard = ({ step, isActive, children }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`p-6 transition-all duration-300 ${
          isActive
            ? "ring-2 ring-primary shadow-lg"
            : step.completed
            ? "border-primary"
            : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-full ${
              step.completed
                ? "bg-primary text-white"
                : isActive
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {step.completed ? (
              <Check className="w-6 h-6" />
            ) : (
              <step.icon className="w-6 h-6" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
          {isActive && (
            <ChevronRight className="w-5 h-5 text-primary animate-bounce" />
          )}
        </div>

        {isActive && <div className="mt-6">{children}</div>}
      </Card>
    </motion.div>
  );
};

export default StepCard;