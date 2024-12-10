import NavigationMenuDemo from "@/components/NavigationMenu";
import PriceCalculator from "@/components/PriceCalculator";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            Calculadora de Preços
          </h1>
          <p className="text-lg text-gray-600">
            Simule diferentes cenários de precificação ajustando os parâmetros conforme sua necessidade
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <PriceCalculator fullPage />
        </div>
      </div>
    </div>
  );
};

export default Calculator;