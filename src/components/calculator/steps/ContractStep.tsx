import { useState } from "react";
import { Plan } from "../PlanSelector";
import { Task } from "@/types/calculator-types";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../ui/use-toast";
import { motion } from "framer-motion";
import { Card } from "../../ui/card";
import { File, Mail, Check, User, Signature } from "lucide-react";

interface ContractStepProps {
  selectedPlan: Plan | null;
  selectedTasks: Task[];
  implementationPrice: number;
  maintenancePrice: number;
  revenueShare: number;
  revenueSharePercent: number;
}

const ContractStep = ({
  selectedPlan,
  selectedTasks,
  implementationPrice,
  maintenancePrice,
  revenueShare,
  revenueSharePercent,
}: ContractStepProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSignContract = () => {
    if (!email) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor, insira seu e-mail para continuar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contrato enviado!",
      description: "Uma cópia do contrato foi enviada para seu e-mail.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <img
          src="/lovable-uploads/04ecb4e9-d4ab-4a46-941c-d3ffbc7ae268.png"
          alt="Agrega.ai Logo"
          className="h-12"
        />
        <div className="text-right">
          <h1 className="text-2xl font-bold">Contrato de Prestação de Serviços</h1>
          <p className="text-sm text-gray-500">Revise os detalhes e assine digitalmente</p>
        </div>
      </div>

      <Card className="p-6 bg-secondary/5">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <File className="h-5 w-5" />
            <h2>Resumo do Plano</h2>
          </div>
          
          <div className="grid gap-4 text-sm">
            <div className="flex justify-between">
              <span>Plano:</span>
              <span className="font-medium">{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Implementação:</span>
              <span className="font-medium">{formatPrice(implementationPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Manutenção Mensal:</span>
              <span className="font-medium">{formatPrice(maintenancePrice)}</span>
            </div>
            {revenueShare > 0 && (
              <div className="flex justify-between">
                <span>Revenue Share:</span>
                <span className="font-medium">{revenueSharePercent}%</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold">Escopo do Projeto</h3>
          <p>
            Baseado nas integrações e recursos selecionados, este contrato contempla:
          </p>
          <ul>
            {selectedTasks.map((task) => (
              <li key={task.name}>{task.name}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-6">Cláusulas Principais</h3>
          <ul>
            <li>Prazo de implementação conforme cronograma aprovado após assinatura</li>
            <li>Suporte técnico incluso no valor de manutenção mensal</li>
            <li>Confidencialidade total das informações compartilhadas</li>
            <li>Pagamentos conforme valores e condições acordadas acima</li>
          </ul>
        </div>

        <div className="space-y-6 pt-6 border-t">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-gray-500">CCO</span>
              </div>
              <div className="h-12 border-b border-gray-300">
                <img
                  src="/lovable-uploads/ff36e6ef-290f-4f4f-a7aa-8df3bd8dbff2.png"
                  alt="Luigi Luft"
                  className="h-8 object-contain"
                />
              </div>
              <p className="text-sm font-medium">Luigi Luft</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-gray-500">COO</span>
              </div>
              <div className="h-12 border-b border-gray-300">
                <img
                  src="/lovable-uploads/ff36e6ef-290f-4f4f-a7aa-8df3bd8dbff2.png"
                  alt="Lucca Luft"
                  className="h-8 object-contain"
                />
              </div>
              <p className="text-sm font-medium">Lucca Luft</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Signature className="h-4 w-4" />
              <span className="text-sm text-gray-500">Sua Assinatura Digital</span>
            </div>
            <div className="h-24 border rounded-lg border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
              <p className="text-sm text-gray-400">Clique ou arraste para assinar</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Digite ou confirme seu e-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSignContract}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Assinar & Enviar Contrato
          </Button>
          
          <p className="text-xs text-center text-gray-500">
            Ao clicar, você concorda com os termos deste contrato e receberá uma cópia por e-mail
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContractStep;