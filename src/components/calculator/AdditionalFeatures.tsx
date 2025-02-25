
import { useState } from "react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Shield, Rocket, Gauge, Headphones } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { 
  supportPackages, 
  securityOptions, 
  marketingOptions, 
  performanceOptions 
} from "@/data/additionalFeatures";
import {
  SupportLevel,
  SecurityFeature,
  MarketingFeature,
  PerformanceFeature,
  Documentation
} from "@/types/calculator-new-features";

interface AdditionalFeaturesProps {
  onFeaturesChange: (features: {
    support: SupportLevel;
    security: SecurityFeature[];
    marketing: MarketingFeature[];
    performance: PerformanceFeature[];
    documentation: Documentation;
  }) => void;
}

const AdditionalFeatures = ({ onFeaturesChange }: AdditionalFeaturesProps) => {
  const [selectedSupport, setSelectedSupport] = useState<SupportLevel>('standard');
  const [selectedSecurity, setSelectedSecurity] = useState<Set<SecurityFeature>>(new Set());
  const [selectedMarketing, setSelectedMarketing] = useState<Set<MarketingFeature>>(new Set());
  const [selectedPerformance, setSelectedPerformance] = useState<Set<PerformanceFeature>>(new Set());
  const [documentation, setDocumentation] = useState<Documentation>({
    technical: true,
    userGuide: true,
    training: false
  });

  const updateFeatures = () => {
    onFeaturesChange({
      support: selectedSupport,
      security: Array.from(selectedSecurity),
      marketing: Array.from(selectedMarketing),
      performance: Array.from(selectedPerformance),
      documentation
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-8">
      {/* Suporte */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Headphones className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Pacote de Suporte</h3>
        </div>
        <RadioGroup
          value={selectedSupport}
          onValueChange={(value: SupportLevel) => {
            setSelectedSupport(value);
            updateFeatures();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {supportPackages.map((pkg) => (
            <div
              key={pkg.level}
              className={`relative flex flex-col space-y-2 rounded-lg border p-4 transition-colors
                ${selectedSupport === pkg.level ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
            >
              <RadioGroupItem value={pkg.level} id={pkg.level} />
              <div>
                <Label htmlFor={pkg.level} className="font-medium capitalize">
                  {pkg.level}
                </Label>
                <p className="text-sm text-gray-500 mt-1">{pkg.hours}h/mês</p>
                <Badge className="mt-2">{formatCurrency(pkg.price)}/mês</Badge>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Segurança */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Segurança e Compliance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityOptions.map((option) => (
            <div
              key={option.id}
              className={`relative flex items-start space-x-3 rounded-lg border p-4 transition-colors
                ${selectedSecurity.has(option.id) ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
            >
              <Checkbox
                id={option.id}
                checked={selectedSecurity.has(option.id)}
                onCheckedChange={(checked) => {
                  const newSelection = new Set(selectedSecurity);
                  if (checked) {
                    newSelection.add(option.id);
                  } else {
                    newSelection.delete(option.id);
                  }
                  setSelectedSecurity(newSelection);
                  updateFeatures();
                }}
              />
              <div className="flex-1">
                <Label htmlFor={option.id} className="font-medium">
                  {option.name}
                </Label>
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                <Badge variant="outline" className="mt-2">
                  {formatCurrency(option.price)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Marketing */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Rocket className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Marketing Digital</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketingOptions.map((option) => (
            <div
              key={option.id}
              className={`relative flex items-start space-x-3 rounded-lg border p-4 transition-colors
                ${selectedMarketing.has(option.id) ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
            >
              <Checkbox
                id={option.id}
                checked={selectedMarketing.has(option.id)}
                onCheckedChange={(checked) => {
                  const newSelection = new Set(selectedMarketing);
                  if (checked) {
                    newSelection.add(option.id);
                  } else {
                    newSelection.delete(option.id);
                  }
                  setSelectedMarketing(newSelection);
                  updateFeatures();
                }}
              />
              <div className="flex-1">
                <Label htmlFor={option.id} className="font-medium">
                  {option.name}
                </Label>
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                <Badge variant="outline" className="mt-2">
                  {formatCurrency(option.price)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Gauge className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Performance e Acessibilidade</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceOptions.map((option) => (
            <div
              key={option.id}
              className={`relative flex items-start space-x-3 rounded-lg border p-4 transition-colors
                ${selectedPerformance.has(option.id) ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
            >
              <Checkbox
                id={option.id}
                checked={selectedPerformance.has(option.id)}
                onCheckedChange={(checked) => {
                  const newSelection = new Set(selectedPerformance);
                  if (checked) {
                    newSelection.add(option.id);
                  } else {
                    newSelection.delete(option.id);
                  }
                  setSelectedPerformance(newSelection);
                  updateFeatures();
                }}
              />
              <div className="flex-1">
                <Label htmlFor={option.id} className="font-medium">
                  {option.name}
                </Label>
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                <Badge variant="outline" className="mt-2">
                  {formatCurrency(option.price)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Documentação */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-semibold">Documentação e Treinamento</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="technical"
              checked={documentation.technical}
              onCheckedChange={(checked) => {
                setDocumentation(prev => ({ ...prev, technical: !!checked }));
                updateFeatures();
              }}
            />
            <div className="flex-1">
              <Label htmlFor="technical" className="font-medium">
                Documentação Técnica
              </Label>
              <p className="text-sm text-gray-500">
                Documentação detalhada da arquitetura e código
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="userGuide"
              checked={documentation.userGuide}
              onCheckedChange={(checked) => {
                setDocumentation(prev => ({ ...prev, userGuide: !!checked }));
                updateFeatures();
              }}
            />
            <div className="flex-1">
              <Label htmlFor="userGuide" className="font-medium">
                Manual do Usuário
              </Label>
              <p className="text-sm text-gray-500">
                Guia completo de uso do sistema
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="training"
              checked={documentation.training}
              onCheckedChange={(checked) => {
                setDocumentation(prev => ({ ...prev, training: !!checked }));
                updateFeatures();
              }}
            />
            <div className="flex-1">
              <Label htmlFor="training" className="font-medium">
                Treinamento da Equipe
              </Label>
              <p className="text-sm text-gray-500">
                Sessões de treinamento para sua equipe
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdditionalFeatures;
