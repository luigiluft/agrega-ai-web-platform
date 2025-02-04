import { motion } from "framer-motion";
import ConsoleOutput from "../ConsoleOutput";
import { SummaryStepProps } from "@/types/calculator-steps";
import { ecommerceExtensions } from "@/data/ecommerceExtensions";
import { Plan } from "../PlanSelector";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const SummaryStep = ({ 
  selectedTasks, 
  selectedExtensions, 
  totalPrice,
  monthlyRevenue = "0",
  onPlanSelect,
  selectedPlan
}: SummaryStepProps & { 
  onPlanSelect: (plan: Plan) => void;
  selectedPlan: Plan | null;
}) => {
  const { toast } = useToast();
  const maintenanceTasks = selectedTasks.filter(task => task.type === "recurring");
  const implementationTasks = selectedTasks.filter(task => task.type !== "recurring");
  
  const HOUR_RATE = 185;
  const maintenancePrice = maintenanceTasks.reduce((acc, task) => acc + task.hours * HOUR_RATE, 0);
  const REVENUE_SHARE_PERCENT = "3";
  const revenueShare = (Number(monthlyRevenue) * Number(REVENUE_SHARE_PERCENT)) / 100;

  const selectedExtensionDetails = Array.from(selectedExtensions).map(id => 
    ecommerceExtensions.find(ext => ext.id === id)
  ).filter(Boolean);

  const totalHours = selectedTasks.reduce((acc, task) => acc + task.hours, 0) +
    selectedExtensionDetails.reduce((acc, ext) => acc + (ext?.implementationHours || 0), 0);

  const handlePlanSelect = (plan: Plan) => {
    onPlanSelect(plan);
    toast({
      title: "Plano selecionado",
      description: `Você selecionou o plano ${plan.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        Resumo do projeto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Plan */}
        <div className="p-6 border rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Plano Mensal</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Implementação</span>
              <span>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            {maintenancePrice > 0 && (
              <div className="flex justify-between">
                <span>Manutenção Mensal</span>
                <span>R$ {maintenancePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Revenue Share</span>
              <span>R$ {revenueShare.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</span>
            </div>
          </div>
          <button
            onClick={() => handlePlanSelect({ id: 'monthly', name: 'Mensal' } as Plan)}
            className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Selecionar Plano Mensal
          </button>
        </div>

        {/* Annual Plan */}
        <div className="p-6 border rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Plano Anual</h3>
          <div className="text-sm text-green-600 mb-4">
            Economia de 1% no Revenue Share
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Implementação</span>
              <span>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            {maintenancePrice > 0 && (
              <div className="flex justify-between">
                <span>Manutenção Mensal</span>
                <span>R$ {maintenancePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Revenue Share</span>
              <span>R$ {(revenueShare * 0.99).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</span>
            </div>
          </div>
          <button
            onClick={() => handlePlanSelect({ id: 'annual', name: 'Anual' } as Plan)}
            className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Selecionar Plano Anual
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;