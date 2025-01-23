import { useEffect, useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Calculator, User } from "lucide-react";

const NavigationMenuDemo = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationMenu className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/ff36e6ef-290f-4f4f-a7aa-8df3bd8dbff2.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
            <span className={`font-bold text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Lovable
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/calculadora')}
              className={`flex items-center space-x-2 hover:text-primary transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span>Calculadora</span>
            </button>
            
            <button
              onClick={() => navigate('/area-cliente')}
              className={`flex items-center space-x-2 hover:text-primary transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Área do Cliente</span>
            </button>
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;