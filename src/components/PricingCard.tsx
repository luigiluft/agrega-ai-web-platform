import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  expandedFeatures: string[];
  isPopular?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const PricingCard = ({ 
  title, 
  price, 
  features, 
  expandedFeatures, 
  isPopular, 
  buttonText = "Calculadora de preço",
  onClick 
}: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const allFeatures = isHovered ? [...features, ...expandedFeatures] : features;

  return (
    <div 
      className={`
        relative w-full h-full p-8 rounded-2xl shadow-lg bg-white 
        transform transition-all duration-300 ease-in-out
        ${isHovered ? 'scale-[1.02] shadow-xl' : ''}
        ${isPopular ? 'ring-2 ring-primary' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
          Mais Popular
        </span>
      )}
      
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-4 text-secondary">{title}</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">{price}</span>
            {price !== "Grátis" && <span className="text-gray-500 ml-2">/mês</span>}
          </div>
          <ul className="space-y-4 mb-8">
            {allFeatures.map((feature, index) => (
              <li key={index} className={`flex items-center gap-3 transition-all duration-300 ${
                index >= features.length ? 'animate-fade-up' : ''
              }`}>
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={onClick}
          className={`
            group w-full py-3 px-4 rounded-xl font-medium transition-all duration-300
            flex items-center justify-center gap-2
            ${isPopular 
              ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
          `}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PricingCard;