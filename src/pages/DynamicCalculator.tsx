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
import { Feature, Category } from "@/types/calculator";
import { motion } from "framer-motion";

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

  const getFeatureHours = (feature: Feature) => feature.hours || feature.monthlyHours || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <CalculatorHeader />

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap gap-2 bg-white/50 p-1 rounded-lg border border-orange-100">
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveCategory("all")}
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Todos
            </TabsTrigger>
            {calculatorCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-orange-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center justify-between text-gray-800">
                    {category.name}
                    <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {category.features
                        .filter(f => selectedFeatures.includes(f.id))
                        .reduce((sum, f) => sum + getFeatureHours(f), 0)}h
                      {category.totalHours && ` / ${category.totalHours}h`}
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {category.features.map((feature: Feature) => (
                      <motion.div 
                        key={feature.id} 
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50/50 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
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
                          className="border-orange-200 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={feature.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature.name} ({getFeatureHours(feature)}h)
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="sticky top-24">
              <DeveloperAnimation 
                totalHours={parseInt(prices.implementationPrice) / 150}
                layoutHours={calculatorCategories[0].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + (f.hours || 0), 0)}
                maintenanceHours={calculatorCategories[2].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + (f.monthlyHours || 0), 0)}
                meetingHours={calculatorCategories[3].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + (f.monthlyHours || 0), 0)}
                campaignHours={calculatorCategories[4].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + (f.monthlyHours || 0), 0)}
                functionalityHours={calculatorCategories[1].features
                  .filter(f => selectedFeatures.includes(f.id))
                  .reduce((sum, f) => sum + (f.hours || 0), 0)}
                selectedPlanName="Plano Personalizado"
              />

              <CalculatorResults 
                {...prices}
                monthlyRevenue={monthlyRevenue}
                setMonthlyRevenue={setMonthlyRevenue}
                onContactClick={handleContactClick}
                layoutHours={0}
                maintenanceHours={0}
                meetingHours={0}
                campaignHours={0}
                functionalityHours={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;