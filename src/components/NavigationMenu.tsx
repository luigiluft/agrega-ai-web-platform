import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Logo from "./navigation/Logo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="w-full border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-24 max-w-[1400px] mx-auto">
            <Logo scrolled={scrolled} />
            <div className="hidden md:flex items-center justify-end flex-1">
              <DesktopNav scrolled={scrolled} />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className={`md:hidden fixed left-0 right-0 transition-all duration-300 bg-white shadow-lg ${
            isMenuOpen ? 'top-24 opacity-100' : '-top-full opacity-0'
          }`}>
            <MobileNav 
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              scrolled={scrolled}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationMenu;