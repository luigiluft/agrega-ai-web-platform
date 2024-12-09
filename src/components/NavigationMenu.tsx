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

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu className="max-w-full w-full bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 z-50">
      <NavigationMenuList className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavigationMenuItem>
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
            Agrega AI
          </Link>
        </NavigationMenuItem>

        <div className="flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base font-medium">Soluções</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <ListItem href="#" title="B2B">
                  Plataforma completa para vendas business-to-business
                </ListItem>
                <ListItem href="#" title="B2C">
                  Soluções para venda direta ao consumidor
                </ListItem>
                <ListItem href="#" title="D2C">
                  Estratégias direct-to-consumer personalizadas
                </ListItem>
                <ListItem href="#" title="Marketplace">
                  Soluções tecnológicas completas para e-commerce e full-commerce
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base font-medium">Integrações</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
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

          <NavigationMenuItem>
            <Link to="/planos" className="text-base font-medium px-4 py-2 hover:text-primary transition-colors">
              Planos
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/contato" className="text-base font-medium px-4 py-2 hover:text-primary transition-colors">
              Contato
            </Link>
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
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none mb-2">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuDemo;