import { useState } from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { calculatorCategories } from "@/utils/calculatorCategories";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import CalculatorResults from "@/components/calculator/CalculatorResults";
import DeveloperAnimation from "@/components/calculator/DeveloperAnimation";

interface Feature {
  id: string;
  name: string;
  description: string;
  hours?: number;
  monthlyHours?: number;
}

const DynamicCalculator = () => {
  const { toast } = useToast();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>("50000");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const calculatePrices = () => {
    const implementationHours = calculatorCategories
      .filter(cat => !['maintenance', 'meetings', 'campaigns'].includes(cat.id))
      .reduce((total, category) => {
        return total + category.features
          .filter(feature => selectedFeatures.includes(feature.id))
          .reduce((sum, feature) => sum + (feature.hours || 0), 0);
      }, 0);

    const monthlyHours = calculatorCategories
      .filter(cat => ['maintenance', 'meetings', 'campaigns'].includes(cat.id))
      .reduce((total, category) => {
        return total + category.features
          .filter(feature => selectedFeatures.includes(feature.id))
          .reduce((sum, feature) => sum + (feature.monthlyHours || 0), 0);
      }, 0);

    const rate = 150;
    const monthlyRate = 200;

    const implementationPrice = implementationHours * rate;
    const maintenancePrice = monthlyHours * monthlyRate;
    
    const revenue = parseFloat(monthlyRevenue) || 0;
    const revenueSharePercent = revenue <= 50000 ? 15 
      : revenue <= 100000 ? 12 
      : revenue <= 200000 ? 10 
      : 8;
    const revenueShare = (revenue * revenueSharePercent) / 100;

    return {
      implementationPrice: implementationPrice.toFixed(2),
      maintenancePrice: maintenancePrice.toFixed(2),
      revenueShare: revenueShare.toFixed(2),
      revenueSharePercent: revenueSharePercent.toString(),
    };
  };

  const handleContactClick = () => {
    toast({
      title: "Orçamento solicitado",
      description: "Em breve nossa equipe entrará em contato com você.",
    });
  };

  const prices = calculatePrices();
  const filteredCategories = activeCategory === "all" 
    ? calculatorCategories 
    : calculatorCategories.filter(category => category.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <CalculatorHeader />

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              Todos
            </TabsTrigger>
            {calculatorCategories.map((category) => (
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
            {filteredCategories.map((category) => (
              <Card key={category.id} className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  {category.name}
                  <span className="text-sm text-muted-foreground">
                    {category.features
                      .filter(f => selectedFeatures.includes(f.id))
                      .reduce((sum, f) => sum + ((f.hours || f.monthlyHours) || 0), 0)}h
                    {category.totalHours && ` / ${category.totalHours}h`}
                  </span>
                </h3>
                <div className="space-y-4">
                  {category.features.map((feature: Feature) => (
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
                          {feature.name} ({feature.hours || feature.monthlyHours}h)
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
                totalHours={parseInt(prices.implementationPrice) / 150}
                layoutHours={calculatorCategories[0].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + ((f.hours || 0)), 0)}
                maintenanceHours={calculatorCategories[2].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + ((f.monthlyHours || 0)), 0)}
                meetingHours={calculatorCategories[3].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + ((f.monthlyHours || 0)), 0)}
                campaignHours={calculatorCategories[4].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + ((f.monthlyHours || 0)), 0)}
                functionalityHours={calculatorCategories[1].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + ((f.hours || 0)), 0)}
                selectedPlanName="Plano Personalizado"
              />

              <CalculatorResults 
                implementationPrice={prices.implementationPrice}
                maintenancePrice={prices.maintenancePrice}
                revenueShare={prices.revenueShare}
                revenueSharePercent={prices.revenueSharePercent}
                monthlyRevenue={monthlyRevenue}
                setMonthlyRevenue={setMonthlyRevenue}
                onContactClick={handleContactClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;