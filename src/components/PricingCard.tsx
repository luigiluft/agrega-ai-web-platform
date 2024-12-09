import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard = ({ title, price, features, isPopular }: PricingCardProps) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg bg-white ${isPopular ? 'ring-2 ring-primary' : ''}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Grátis" && <span className="text-gray-500">/mês</span>}
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full mt-6 py-2 px-4 rounded-lg font-medium transition-colors
        ${isPopular 
          ? 'bg-primary text-white hover:bg-primary-dark' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
        Começar agora
      </button>
    </div>
  );
};

export default PricingCard;