import { Button } from "@/components/ui/button";
import { Calculator, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  scrolled: boolean;
}

const MobileNav = ({ isOpen, onClose, scrolled }: MobileNavProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className={`md:hidden transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
    }`}>
      <div className="flex flex-col space-y-4">
        <Button
          variant="ghost"
          onClick={() => handleNavigation('/calculadora')}
          className={`flex items-center gap-2 justify-start ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Calculadora
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => handleNavigation('/area-cliente')}
          className={`flex items-center gap-2 justify-start ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          <User className="w-4 h-4" />
          Área do Cliente
        </Button>

        <Button
          variant="default"
          onClick={() => handleNavigation('/login')}
          className="bg-primary hover:bg-primary-dark text-white w-full justify-start"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;