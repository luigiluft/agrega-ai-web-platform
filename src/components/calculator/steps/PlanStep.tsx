import { motion } from "framer-motion";
import PlanSelector from "../PlanSelector";
import { Plan } from "../PlanSelector";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface PlanStepProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const PlanStep = ({ selectedPlan, onPlanSelect }: PlanStepProps) => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const planId = searchParams.get('plan');
    if (planId && !selectedPlan) {
      const plan = {
        id: planId,
        name: planId.charAt(0).toUpperCase() + planId.slice(1),
        description: '',
        features: [],
        baseImplementationPrice: 0,
        baseMaintenancePrice: 0,
        basePOHours: 0,
        maxIntegrations: 0
      } as Plan;
      
      onPlanSelect(plan);
      
      toast({
        title: "Plano pré-selecionado",
        description: `Você selecionou o plano ${plan.name}. Você pode alterá-lo se desejar.`,
      });
    }
  }, [searchParams, selectedPlan, onPlanSelect]);

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