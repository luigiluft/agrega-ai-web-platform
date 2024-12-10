import { useState } from "react";
import NavigationMenuDemo from "@/components/NavigationMenu";
import { Filter, Palette, ShoppingBag, Shirt, Brush, PawPrint, Eye, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/components/theme/themeData";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Market = "all" | "fashion" | "cosmetics" | "pets";

const Themes = () => {
  const [selectedMarket, setSelectedMarket] = useState<Market>("all");

  const markets = [
    { id: "all", name: "Todos", icon: Palette },
    { id: "fashion", name: "Moda", icon: Shirt },
    { id: "cosmetics", name: "Cosméticos", icon: Brush },
    { id: "pets", name: "Pet Shop", icon: PawPrint },
  ];

  const filteredThemes = themes.filter(theme => 
    selectedMarket === "all" ? true : theme.market === selectedMarket
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationMenuDemo />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Filter className="w-5 h-5" />
                Filtrar por Mercado
              </div>
              <div className="space-y-2">
                {markets.map((market) => {
                  const Icon = market.icon;
                  return (
                    <button
                      key={market.id}
                      onClick={() => setSelectedMarket(market.id as Market)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                        selectedMarket === market.id
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {market.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Themes Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{theme.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{theme.description}</p>
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                            <Eye className="w-4 h-4" />
                            Ver Detalhes
                          </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:max-w-xl">
                          <SheetHeader className="mb-6">
                            <SheetTitle>{theme.name}</SheetTitle>
                            <SheetDescription>{theme.description}</SheetDescription>
                          </SheetHeader>
                          <div className="space-y-6">
                            <img
                              src={theme.image}
                              alt={theme.name}
                              className="w-full rounded-lg object-cover aspect-video"
                            />
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Descrição Completa</h3>
                              <p className="text-gray-600">{theme.fullDescription}</p>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Recursos</h3>
                              <ul className="space-y-2">
                                {theme.features.map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2 text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <a
                              href={theme.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors w-full justify-center"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Ver Demo
                            </a>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Themes;