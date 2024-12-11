import { useState } from "react";
import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Settings, Store, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { themes } from "@/components/theme/themeData";
import { ThemeCard } from "@/components/theme/ThemeCard";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

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
  const [averageTicket, setAverageTicket] = useState("");
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

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
      title: "Volume e Faturamento",
      description: "Estime seus números mensais",
      icon: Users,
      completed: !!monthlyVolume && !!averageTicket,
    },
  ];

  const businessTypes = [
    { id: "b2b", title: "B2B", description: "Business to Business" },
    { id: "b2c", title: "B2C", description: "Business to Consumer" },
    { id: "d2c", title: "D2C", description: "Direct to Consumer" },
    { id: "marketplace", title: "Marketplace", description: "Plataforma Multi-vendedor" },
  ];

  const handleThemeSelect = (themeId: number) => {
    setSelectedTheme(String(themeId));
    toast.success("Tema selecionado com sucesso!");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setCurrentStep(2);
    toast.success("Tipo de negócio selecionado!");
  };

  const handleVolumeSubmit = () => {
    if (!monthlyVolume || !averageTicket) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    navigate("/calculadora");
  };

  const handleNextTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const handlePreviousTheme = () => {
    setCurrentThemeIndex((prev) => (prev - 1 + themes.length) % themes.length);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="relative h-[600px] w-full">
            {themes.map((theme, index) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                index={index}
                totalThemes={themes.length}
                isSelected={index === currentThemeIndex}
                onSelect={handleThemeSelect}
                onNext={handleNextTheme}
                onPrevious={handlePreviousTheme}
              />
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessTypes.map((type) => (
              <Card
                key={type.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === type.id ? "border-primary" : ""
                }`}
                onClick={() => handleTypeSelect(type.id)}
              >
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Volume Mensal de Pedidos
                </label>
                <input
                  type="number"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Ex: 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ticket Médio (R$)
                </label>
                <input
                  type="number"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Ex: 150"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleVolumeSubmit}
              >
                Calcular Investimento
              </Button>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <SolutionLayout
      title="Área do Cliente"
      subtitle="Configure seu site em poucos passos"
      className="max-w-4xl"
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 mr-4">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>
          <span className="text-sm text-gray-500">
            Etapa {currentStep + 1} de {steps.length}
          </span>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`p-6 transition-all duration-300 ${
                index === currentStep
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
                      : index === currentStep
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
                {index === currentStep && (
                  <ChevronRight className="w-5 h-5 text-primary animate-bounce" />
                )}
              </div>

              {index === currentStep && (
                <div className="mt-6">{renderStepContent()}</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};

export default ClientArea;