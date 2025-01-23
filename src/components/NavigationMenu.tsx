import { useEffect, useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";

const NavigationMenuDemo = () => {
  const [scrolled, setScrolled] = useState(false);

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
        <ul className="flex space-x-4">
          <li><a href="/" className="text-gray-900 hover:text-primary">Home</a></li>
          <li><a href="/sobre" className="text-gray-900 hover:text-primary">Sobre</a></li>
          <li><a href="/servicos" className="text-gray-900 hover:text-primary">Serviços</a></li>
          <li><a href="/contato" className="text-gray-900 hover:text-primary">Contato</a></li>
        </ul>
      </div>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
