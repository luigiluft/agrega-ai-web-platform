import { useState } from "react";
import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Settings, Store, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed?: boolean;
}

const ClientArea = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");

  const steps: Step[] = [
    {
      id: "theme",
      title: "Escolha do Tema",
      description: "Selecione o design perfeito para seu site",
      icon: Store,
      completed: !!selectedTheme,
    },
    {
      id: "type",
      title: "Tipo de Site",
      description: "Defina o modelo de negócio",
      icon: Settings,
      completed: !!selectedType,
    },
    {
      id: "volume",
      title: "Volume Mensal",
      description: "Estime seu volume de vendas",
      icon: Users,
      completed: !!monthlyVolume,
    },
  ];

  const handleStepClick = (index: number) => {
    if (index === 0) navigate("/temas");
    if (index === 1) navigate("/planos");
    if (index === 2) navigate("/calculadora");
  };

  return (
    <SolutionLayout
      title="Área do Cliente"
      subtitle="Configure seu site em poucos passos"
      className="max-w-4xl"
    >
      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
              step.completed ? "border-primary" : ""
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  step.completed
                    ? "bg-primary text-white"
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
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}

        <Button
          className="w-full mt-4"
          size="lg"
          onClick={() => navigate("/calculadora")}
        >
          Calcular Orçamento Final
        </Button>
      </div>
    </SolutionLayout>
  );
};

export default ClientArea;