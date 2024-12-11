import { useState } from "react";
import { Store, Settings, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SolutionLayout from "@/components/solutions/SolutionLayout";
import { themes } from "@/components/theme/themeData";
import { ThemeCard } from "@/components/theme/ThemeCard";
import { useNavigate } from "react-router-dom";
import StepCard from "@/components/client-area/StepCard";
import ScopePreview from "@/components/client-area/ScopePreview";
import ProjectTimeline from "@/components/client-area/ProjectTimeline";
import ProjectDashboard from "@/components/client-area/ProjectDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ClientArea = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [averageTicket, setAverageTicket] = useState("");
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const steps = [
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
      icon: DollarSign,
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
    setCurrentStep(1);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    toast.success("Tipo de negócio selecionado!");
    setCurrentStep(2);
  };

  const handleVolumeSubmit = () => {
    if (!monthlyVolume || !averageTicket) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    const monthlyRevenue = Number(monthlyVolume) * Number(averageTicket);
    toast.success(`Faturamento mensal estimado: R$ ${monthlyRevenue.toLocaleString()}`);
    navigate("/calculadora", { 
      state: { 
        monthlyVolume, 
        averageTicket, 
        selectedTheme, 
        selectedType 
      } 
    });
  };

  const handleNextTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const handlePreviousTheme = () => {
    setCurrentThemeIndex((prev) => (prev - 1 + themes.length) % themes.length);
  };

  return (
    <SolutionLayout
      title="Área do Cliente"
      subtitle="Acompanhe o progresso do seu projeto"
      className="max-w-7xl"
    >
      <Tabs defaultValue="project" className="w-full">
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="project">Visão Geral</TabsTrigger>
          <TabsTrigger value="setup">Configuração</TabsTrigger>
        </TabsList>

        <TabsContent value="project">
          <div className="space-y-8">
            <ProjectDashboard />
            <ProjectTimeline />
          </div>
        </TabsContent>

        <TabsContent value="setup">
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
                <StepCard
                  key={step.id}
                  step={step}
                  isActive={index === currentStep}
                >
              {index === 0 && (
                <div className="relative h-[600px] w-full">
                  {themes.map((theme, idx) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      index={idx}
                      totalThemes={themes.length}
                      isSelected={idx === currentThemeIndex}
                      onSelect={handleThemeSelect}
                      onNext={handleNextTheme}
                      onPrevious={handlePreviousTheme}
                    />
                  ))}
                </div>
              )}

              {index === 1 && (
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
              )}

              {index === 2 && (
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
              )}
                </StepCard>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ScopePreview
        selectedTheme={selectedTheme}
        selectedType={selectedType}
        monthlyVolume={monthlyVolume}
        averageTicket={averageTicket}
      />
    </SolutionLayout>
  );
};

export default ClientArea;
