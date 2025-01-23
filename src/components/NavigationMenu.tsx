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
    <NavigationMenu className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className={`font-bold text-2xl tracking-tight ${
              scrolled ? 'text-primary' : 'text-white'
            } hover:scale-105 transition-transform duration-200`}>
              AGREGAÍ
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={scrolled ? "outline" : "secondary"}
              onClick={() => navigate('/calculadora')}
              className="group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-calculator transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculadora
              </span>
            </Button>
            
            <Button
              variant={scrolled ? "outline" : "secondary"}
              onClick={() => navigate('/area-cliente')}
              className="group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-calculator transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative flex items-center gap-2">
                <User className="w-4 h-4" />
                Área do Cliente
              </span>
            </Button>
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;