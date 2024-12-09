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
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                        alt="Tecnologia Agrega AI" 
                        className="w-full h-32 object-cover rounded-md mb-4"
                      />
                      <div className="mb-2 text-lg font-medium text-white">
                        Agrega AI
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        Soluções tecnológicas completas para e-commerce e full-commerce
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="B2B" icon="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d">
                  Plataforma completa para vendas business-to-business
                </ListItem>
                <ListItem href="#" title="B2C" icon="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158">
                  Soluções para venda direta ao consumidor
                </ListItem>
                <ListItem href="#" title="D2C" icon="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7">
                  Estratégias direct-to-consumer personalizadas
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base font-medium">Integrações</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <ListItem href="#" title="Automação" icon="https://images.unsplash.com/photo-1498050108023-c5249f4df085">
                  Automatize processos operacionais
                </ListItem>
                <ListItem href="#" title="Centralização" icon="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9">
                  Gestão centralizada de operações
                </ListItem>
                <ListItem href="#" title="APIs" icon="https://images.unsplash.com/photo-1483058712412-4245e9b90334">
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
  icon,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  icon: string;
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
          <img src={icon} alt={title} className="w-full h-24 object-cover rounded-md mb-3" />
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuDemo;
