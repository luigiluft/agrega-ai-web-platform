import { useState } from "react";
import { Calculator } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Task } from "@/types/calculator-types";
import { motion } from "framer-motion";
import PlanSelector, { Plan } from "./calculator/PlanSelector";
import { calculatorTasks } from "@/data/calculatorTasks";
import { ecommerceTasks } from "@/data/ecommerceTasks";
import { calculatePrices } from "./calculator/pricing/PricingLogic";
import PlanContent from "./calculator/PlanContent";

const PriceCalculator = ({ fullPage = false }: { fullPage?: boolean }) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [averageTicket, setAverageTicket] = useState<string>("150");
  const [monthlyOrders, setMonthlyOrders] = useState<string>("100");

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    
    const allTasks = [
      ...calculatorTasks.flatMap(category => category.tasks),
      ...ecommerceTasks.flatMap(category => category.tasks)
    ];

    let preSelectedTasks: Task[] = [];
    
    if (plan.id === 'express') {
      preSelectedTasks = allTasks.filter(task => {
        if (task.story === "Briefing") {
          return task.name.includes("técnico") && task.hours <= 2;
        }
        if (task.story === "Implementação do layout") {
          return task.name.includes("Homepage") && task.hours <= 10;
        }
        if (task.type === "recurring") {
          return (
            (task.name.includes("conteúdo") && task.hours <= 2) ||
            (task.name.includes("bugs") && task.hours <= 4) ||
            (task.name.includes("pagamentos") && task.hours <= 4)
          );
        }
        if (task.name.includes("Base")) {
          return task.hours <= 8;
        }
        return false;
      });
    } else if (plan.id === 'standard') {
      preSelectedTasks = allTasks.filter(task => {
        if (task.story === "Briefing") {
          return task.hours <= 8;
        }
        if (task.story === "Implementação do layout") {
          return task.hours <= 24;
        }
        if (task.story === "Elaboração dos criativos") {
          return task.hours <= 16;
        }
        if (task.type === "recurring") {
          return task.hours <= 8;
        }
        if (task.name.includes("Base")) {
          return task.hours <= 8;
        }
        return false;
      });
    } else {
      preSelectedTasks = allTasks.filter(task => 
        task.type === "essential" ||
        task.type === "optional" ||
        (task.type === "recurring" && task.hours <= 16)
      );
    }

    setSelectedTasks(preSelectedTasks);
    setSelectedExtensions(new Set());
  };

  const handleExtensionToggle = (extensionId: string, checked: boolean) => {
    const newSelectedExtensions = new Set(selectedExtensions);
    if (checked) {
      newSelectedExtensions.add(extensionId);
    } else {
      newSelectedExtensions.delete(extensionId);
    }
    setSelectedExtensions(newSelectedExtensions);
  };

  const prices = calculatePrices(selectedTasks, selectedPlan, monthlyRevenue);

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const calculatorContent = (
    <div className="mt-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PlanSelector
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
        />
      </motion.div>

      {selectedPlan && (
        <PlanContent
          selectedPlan={selectedPlan}
          selectedTasks={selectedTasks}
          selectedExtensions={selectedExtensions}
          monthlyRevenue={monthlyRevenue}
          averageTicket={averageTicket}
          monthlyOrders={monthlyOrders}
          prices={prices}
          onTasksChange={setSelectedTasks}
          onExtensionToggle={handleExtensionToggle}
          setMonthlyRevenue={setMonthlyRevenue}
          setAverageTicket={setAverageTicket}
          setMonthlyOrders={setMonthlyOrders}
          onContactClick={handleContactClick}
          setSelectedPlan={setSelectedPlan}
        />
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        {calculatorContent}
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Calculator className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] lg:w-[900px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Calculadora de Preços</SheetTitle>
          <SheetDescription>
            Escolha um plano e ajuste os parâmetros para simular diferentes cenários de precificação
          </SheetDescription>
        </SheetHeader>
        {calculatorContent}
      </SheetContent>
    </Sheet>
  );
};

export default PriceCalculator;