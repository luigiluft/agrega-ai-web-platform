import { Link } from "react-router-dom";
import { Calculator, User } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const NavigationMenuDemo = () => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 1)"]
  );

  const textColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 0.8)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        hasScrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            style={{ color: textColor }}
            className="text-2xl font-bold bg-clip-text"
          >
            AGREGAÍ
          </motion.span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/calculadora">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-colors"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculadora
            </Button>
          </Link>
          
          <Link to="/area-do-cliente">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              Área do Cliente
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
          >
            Entrar
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default NavigationMenuDemo;