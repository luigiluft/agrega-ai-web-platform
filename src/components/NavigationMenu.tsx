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
    <NavigationMenu className="max-w-full w-full bg-white shadow-sm">
      <NavigationMenuList className="container mx-auto px-6 py-2 flex justify-between items-center">
        <NavigationMenuItem>
          <Link to="/" className="text-xl font-bold text-primary">
            Agrega AI
          </Link>
        </NavigationMenuItem>

        <div className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        Agrega AI
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        Soluções tecnológicas completas para e-commerce e full-commerce
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
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
                  Integração e gestão de marketplaces
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Integrações</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
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
            <NavigationMenuTrigger>Segmentos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem href="#" title="Cosméticos">
                  Soluções específicas para o mercado de beleza
                </ListItem>
                <ListItem href="#" title="Suplementos">
                  Plataformas para venda de suplementos
                </ListItem>
                <ListItem href="#" title="Moda">
                  E-commerce especializado para moda
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/planos" className="px-4 py-2 hover:text-primary">
              Planos
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/contato" className="px-4 py-2 hover:text-primary">
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuDemo;