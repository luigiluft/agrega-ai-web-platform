import { useEffect, useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./navigation/Logo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

const NavigationMenuDemo = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationMenu className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="w-full border-b border-transparent">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-20 max-w-[1400px] mx-auto">
            <Logo scrolled={scrolled} />
            <DesktopNav scrolled={scrolled} />

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

          {/* Mobile Navigation with fixed positioning */}
          <div className={`md:hidden fixed left-0 right-0 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg ${
            isMenuOpen ? 'top-20 opacity-100' : '-top-full opacity-0'
          }`}>
            <MobileNav 
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              scrolled={scrolled}
            />
          </div>
        </div>
      </div>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;