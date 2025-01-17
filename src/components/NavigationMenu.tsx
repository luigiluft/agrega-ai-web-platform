import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle2, LogOut, Calculator } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NavigationMenuDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <NavigationMenu className="max-w-full w-full bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 z-50">
      <NavigationMenuList className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavigationMenuItem className="mr-auto">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
            Agrega AI
          </Link>
        </NavigationMenuItem>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={cn(
          "lg:flex gap-8 absolute lg:static left-0 right-0 top-full bg-white/95 lg:bg-transparent shadow-lg lg:shadow-none",
          "transition-all duration-300 ease-in-out",
          isOpen ? "block" : "hidden"
        )}>
          <NavigationMenuItem className="block lg:inline-block py-3 lg:py-0 px-6 lg:px-0">
            <NavigationMenuTrigger className="text-base font-medium h-10">Soluções</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] relative -left-6">
                <ListItem href="/b2b" title="B2B">
                  Plataforma completa para vendas business-to-business
                </ListItem>
                <ListItem href="/b2c" title="B2C">
                  Soluções para venda direta ao consumidor
                </ListItem>
                <ListItem href="/d2c" title="D2C">
                  Estratégias direct-to-consumer personalizadas
                </ListItem>
                <ListItem href="/marketplace" title="Marketplace">
                  Soluções tecnológicas completas para e-commerce e full-commerce
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="block lg:inline-block py-3 lg:py-0 px-6 lg:px-0">
            <NavigationMenuTrigger className="text-base font-medium h-10">Integrações</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] relative -left-6">
                <ListItem href="#" title="Automação">
                  Automatize processos operacionais
                </ListItem>
                <ListItem href="#" title="Centralização">
                  Gestão centralizada de operações
                </ListItem>
                <ListItem href="#" title="APIs">
                  Integrações customizadas via API
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="block lg:inline-block py-3 lg:py-0 px-6 lg:px-0">
            <Link to="/temas" className="text-base font-medium hover:text-primary transition-colors block h-10 flex items-center">
              Temas
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="block lg:inline-block py-3 lg:py-0 px-6 lg:px-0">
            <Link to="/planos" className="text-base font-medium hover:text-primary transition-colors block h-10 flex items-center">
              Planos
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="block lg:inline-block py-3 lg:py-0 px-6 lg:px-0">
            <Link 
              to="/calculadora" 
              className="text-base font-medium hover:bg-primary/10 transition-colors block h-10 flex items-center gap-2 px-4 rounded-lg bg-primary/5 relative group"
            >
              <Calculator className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-primary transition-colors">Calculadora de Preços</span>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                Nova
              </span>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="block lg:inline-block py-3 lg:py-0 px-6 lg:px-0 ml-auto">
            <div className="flex items-center gap-2">
              <Link 
                to="/area-cliente" 
                className="text-base font-medium h-10 bg-primary text-white hover:bg-primary/90 px-4 rounded-lg flex items-center gap-2"
              >
                <UserCircle2 className="w-4 h-4" />
                Área do Cliente
              </Link>
              
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="text-base font-medium h-10 bg-red-500 text-white hover:bg-red-600 px-4 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              )}
            </div>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = ({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none mb-2">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuDemo;
