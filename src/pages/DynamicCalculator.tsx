import NavigationMenuDemo from "@/components/NavigationMenu";
import StepCalculator from "@/components/calculator/StepCalculator";

const DynamicCalculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-light">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Calculadora de Preços
            </h1>
            <p className="text-lg text-white/90">
              Configure seu projeto e receba um orçamento personalizado
            </p>
          </div>

          <StepCalculator />
        </div>
      </div>
    </div>
  );
};

export default DynamicCalculator;