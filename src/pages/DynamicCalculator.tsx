import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { calculatorFeatures } from "@/utils/calculatorFeatures";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import DeveloperAnimation from "@/components/calculator/DeveloperAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DynamicCalculator = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    // Get hours from URL parameters and select corresponding features
    const layoutHours = parseInt(searchParams.get("layoutHours") || "0");
    const maintenanceHours = parseInt(searchParams.get("maintenanceHours") || "0");
    const meetingHours = parseInt(searchParams.get("meetingHours") || "0");
    const campaignHours = parseInt(searchParams.get("campaignHours") || "0");
    const functionalityHours = parseInt(searchParams.get("functionalityHours") || "0");

    const autoSelectFeatures = () => {
      const newSelectedFeatures: string[] = [];

      calculatorFeatures.forEach(category => {
        let remainingHours = 0;
        switch (category.id) {
          case "layout":
            remainingHours = layoutHours;
            break;
          case "maintenance":
            remainingHours = maintenanceHours;
            break;
          case "meetings":
            remainingHours = meetingHours;
            break;
          case "campaigns":
            remainingHours = campaignHours;
            break;
          case "functionality":
            remainingHours = functionalityHours;
            break;
        }

        category.features.forEach(feature => {
          if (remainingHours >= feature.hours) {
            newSelectedFeatures.push(feature.id);
            remainingHours -= feature.hours;
          }
        });
      });

      setSelectedFeatures(newSelectedFeatures);
    };

    autoSelectFeatures();
  }, [searchParams]);

  const calculateTotalHours = () => {
    return calculatorFeatures.reduce((total, category) => {
      const categoryHours = category.features
        .filter(feature => selectedFeatures.includes(feature.id))
        .reduce((sum, feature) => sum + feature.hours, 0);
      return total + categoryHours;
    }, 0);
  };

  const calculatePrices = () => {
    const totalHours = calculateTotalHours();
    const rate = 100;
    const baseImplementationCost = totalHours * rate;
    const implementationPrice = baseImplementationCost * 1.1;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const revenueSharePercent = revenue <= 50000 ? 0.15 : revenue <= 100000 ? 0.12 : revenue <= 200000 ? 0.10 : 0.08;
    const revenueShare = revenue * revenueSharePercent;
    const discountAmount = Math.floor(totalHours / 50) * 50;

    return {
      implementationPrice: (implementationPrice - discountAmount).toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      revenueSharePercent: (revenueSharePercent * 100).toFixed(1),
      totalHours,
      discountAmount
    };
  };

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const prices = calculatePrices();

  const filteredFeatures = activeCategory === "all" 
    ? calculatorFeatures 
    : calculatorFeatures.filter(category => category.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            Calculadora Dinâmica
          </h1>
          <p className="text-lg text-gray-600">
            Selecione as funcionalidades que deseja incluir no seu projeto
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              Todos
            </TabsTrigger>
            {calculatorFeatures.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredFeatures.map((category) => (
              <Card key={category.id} className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  {category.name}
                  <span className="text-sm text-muted-foreground">
                    {category.features.filter(f => selectedFeatures.includes(f.id))
                      .reduce((sum, f) => sum + f.hours, 0)}h / {category.totalHours}h
                  </span>
                </h3>
                <div className="space-y-4">
                  {category.features.map((feature) => (
                    <div key={feature.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={feature.id}
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={(checked) => {
                          setSelectedFeatures(prev => 
                            checked 
                              ? [...prev, feature.id]
                              : prev.filter(id => id !== feature.id)
                          );
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={feature.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature.name} ({feature.hours}h)
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <div className="sticky top-24">
              <DeveloperAnimation 
                totalHours={prices.totalHours}
                layoutHours={calculatorFeatures[0].features.filter(f => selectedFeatures.includes(f.id)).reduce((sum, f) => sum + f.hours, 0)}
                maintenanceHours={calculatorFeatures[2].features.filter(f => selectedFeatures.includes(f.id)).reduce((sum, f) => sum + f.hours, 0)}
                meetingHours={calculatorFeatures[3].features.filter(f => selectedFeatures.includes(f.id)).reduce((sum, f) => sum + f.hours, 0)}
                campaignHours={calculatorFeatures[4].features.filter(f => selectedFeatures.includes(f.id)).reduce((sum, f) => sum + f.hours, 0)}
                functionalityHours={calculatorFeatures[1].features.filter(f => selectedFeatures.includes(f.id)).reduce((sum, f) => sum + f.hours, 0)}
                selectedPlanName="Plano Personalizado"
              />

              <Card className="p-6 space-y-6 mt-6 bg-gradient-to-br from-background to-secondary/5">
                <div className="space-y-4">
                  <div className="pb-4 border-b">
                    <div className="text-sm text-muted-foreground">Implementação</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <div className="text-2xl font-bold">
                        R$ {prices.implementationPrice}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        pagamento único
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Comissão sobre Vendas
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <div className="text-2xl font-bold">
                        {prices.revenueSharePercent}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        do faturamento
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Aproximadamente R$ {prices.revenueShare}/mês
                    </div>
                  </div>
                </div>
              </Card>

              <Button 
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
                size="lg"
                onClick={handleContactClick}
              >
                {prices.totalHours > 91 ? "Solicitar Orçamento" : "Contratar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;