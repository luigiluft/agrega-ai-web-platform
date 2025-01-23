import { useEffect, useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Calculator, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationMenuDemo = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <NavigationMenu className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="w-full border-b border-transparent">
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div 
              className="flex items-center cursor-pointer transform hover:scale-105 transition-all duration-300" 
              onClick={() => navigate('/')}
            >
              <span className={`font-bold text-3xl tracking-tight ${
                scrolled ? 'text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark' : 'text-white'
              }`}>
                AGREGAÍ
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/calculadora')}
                className={`group flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                <Calculator className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary">Calculadora</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => navigate('/area-cliente')}
                className={`group flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                <User className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary">Área do Cliente</span>
              </Button>

              <Button
                variant="default"
                onClick={() => navigate('/login')}
                className="bg-primary hover:bg-primary-dark text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Entrar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${scrolled ? 'text-gray-800' : 'text-white'}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="flex flex-col space-y-4">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/calculadora');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 justify-start ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                <Calculator className="w-4 h-4" />
                Calculadora
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/area-cliente');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 justify-start ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                <User className="w-4 h-4" />
                Área do Cliente
              </Button>

              <Button
                variant="default"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className="bg-primary hover:bg-primary-dark text-white w-full justify-start"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;