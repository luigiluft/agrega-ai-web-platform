import { motion } from "framer-motion";
import PlanSelector from "../PlanSelector";
import { Plan } from "../PlanSelector";

interface PlanStepProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const PlanStep = ({ selectedPlan, onPlanSelect }: PlanStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Escolha o plano ideal para seu negócio
      </h2>
      <PlanSelector selectedPlan={selectedPlan} onPlanSelect={onPlanSelect} />
    </div>
  );
};

export default PlanStep;