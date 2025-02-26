
import { motion } from "framer-motion";
import { Building2, Users, Store, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type PlatformType = "b2b" | "b2c" | "d2c" | "custom";

interface PlatformStepProps {
  selectedPlatform: PlatformType | null;
  onPlatformSelect: (platform: PlatformType) => void;
}

const platforms = [
  {
    id: "b2b" as PlatformType,
    name: "B2B",
    description: "Plataforma para vendas entre empresas",
    icon: Building2,
  },
  {
    id: "b2c" as PlatformType,
    name: "B2C",
    description: "Plataforma para venda direta ao consumidor",
    icon: Users,
  },
  {
    id: "d2c" as PlatformType,
    name: "D2C",
    description: "Plataforma para fabricantes venderem diretamente ao consumidor",
    icon: Store,
  },
  {
    id: "custom" as PlatformType,
    name: "Personalizado",
    description: "Combine diferentes modelos de negócio",
    icon: Settings,
  },
];

const PlatformStep = ({ selectedPlatform, onPlatformSelect }: PlatformStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className={`relative h-full overflow-hidden border-2 cursor-pointer ${
                  selectedPlatform === platform.id
                    ? "border-primary shadow-lg"
                    : "border-transparent hover:border-primary/30"
                }`}
                onClick={() => onPlatformSelect(platform.id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="text-xl font-bold">{platform.name}</h3>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformStep;
