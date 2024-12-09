import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard = ({ title, price, features, isPopular }: PricingCardProps) => {
  return (
    <div 
      className={`
        p-8 rounded-xl shadow-lg bg-white 
        transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${isPopular ? 'ring-2 ring-primary relative' : ''}
      `}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Mais Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Grátis" && <span className="text-gray-500 ml-2">/mês</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        className={`
          w-full py-3 px-4 rounded-lg font-medium transition-all duration-300
          ${isPopular 
            ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
        `}
      >
        Começar agora
      </button>
    </div>
  );
};

export default PricingCard;