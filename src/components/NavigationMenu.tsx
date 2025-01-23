import { useEffect, useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Calculator, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className={`font-bold text-2xl tracking-tight ${
              scrolled ? 'text-primary' : 'text-white'
            }`}>
              AGREGAÍ
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/calculadora')}
              className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculadora
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => navigate('/area-cliente')}
              className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              Área do Cliente
            </Button>
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;