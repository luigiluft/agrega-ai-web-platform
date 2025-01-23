import { Button } from "@/components/ui/button";
import { Calculator, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DesktopNavProps {
  scrolled: boolean;
}

const DesktopNav = ({ scrolled }: DesktopNavProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/calculadora')}
        className={`group flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 ${
          scrolled 
            ? 'text-gray-800' 
            : 'text-white hover:bg-white/10 drop-shadow-lg'
        }`}
      >
        <Calculator className="w-4 h-4 group-hover:text-primary transition-colors" />
        <span className="group-hover:text-primary">Calculadora</span>
      </Button>
      
      <Button
        variant="ghost"
        onClick={() => navigate('/area-cliente')}
        className={`group flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 ${
          scrolled 
            ? 'text-gray-800' 
            : 'text-white hover:bg-white/10 drop-shadow-lg'
        }`}
      >
        <User className="w-4 h-4 group-hover:text-primary transition-colors" />
        <span className="group-hover:text-primary">Área do Cliente</span>
      </Button>

      <Button
        variant="default"
        onClick={() => navigate('/area-cliente')}
        className={`bg-primary hover:bg-primary-dark text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
          !scrolled && 'shadow-black/20'
        }`}
      >
        Entrar
      </Button>
    </div>
  );
};

export default DesktopNav;