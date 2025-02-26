
import { motion } from "framer-motion";
import { Building2, Users, Store, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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
    color: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
    hoverColor: "group-hover:from-blue-500/20 group-hover:to-blue-600/20",
    iconColor: "text-blue-500",
  },
  {
    id: "b2c" as PlatformType,
    name: "B2C",
    description: "Plataforma para venda direta ao consumidor",
    icon: Users,
    color: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
    hoverColor: "group-hover:from-purple-500/20 group-hover:to-purple-600/20",
    iconColor: "text-purple-500",
  },
  {
    id: "d2c" as PlatformType,
    name: "D2C",
    description: "Plataforma para fabricantes venderem diretamente ao consumidor",
    icon: Store,
    color: "bg-gradient-to-br from-green-500/10 to-green-600/10",
    hoverColor: "group-hover:from-green-500/20 group-hover:to-green-600/20",
    iconColor: "text-green-500",
  },
  {
    id: "custom" as PlatformType,
    name: "Personalizado",
    description: "Combine diferentes modelos de negócio",
    icon: Settings,
    color: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
    hoverColor: "group-hover:from-orange-500/20 group-hover:to-orange-600/20",
    iconColor: "text-orange-500",
  },
];

const PlatformStep = ({ selectedPlatform, onPlatformSelect }: PlatformStepProps) => {
  const [customDetails, setCustomDetails] = useState("");

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Escolha seu modelo de negócio</h2>
        <p className="text-gray-600">Selecione o tipo de plataforma que melhor se adequa ao seu negócio</p>
      </div>

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
                className={`group relative h-full overflow-hidden border-0 cursor-pointer transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => onPlatformSelect(platform.id)}
              >
                <div className={`absolute inset-0 transition-all duration-300 ${platform.color} ${platform.hoverColor}`} />
                <CardContent className="relative p-6">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      platform.color.replace("/10", "/20")
                    }`}>
                      <Icon className={`w-6 h-6 ${platform.iconColor}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">{platform.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{platform.description}</p>
                    </div>
                    <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
                      selectedPlatform === platform.id
                        ? platform.iconColor
                        : "bg-gray-200 group-hover:" + platform.iconColor
                    }`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {selectedPlatform === "custom" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium text-gray-700">
            Por favor, descreva seu modelo de negócio personalizado
          </label>
          <Textarea
            value={customDetails}
            onChange={(e) => setCustomDetails(e.target.value)}
            placeholder="Explique como você pretende combinar diferentes modelos de negócio..."
            className="min-h-[120px]"
          />
        </motion.div>
      )}
    </div>
  );
};

export default PlatformStep;
