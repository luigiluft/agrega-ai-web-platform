import { useState } from "react";
import { Plan } from "../PlanSelector";
import { Task } from "@/types/calculator-types";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../ui/use-toast";
import { motion } from "framer-motion";
import { Card } from "../../ui/card";
import { File, Mail, Check, CreditCard, QrCode, Receipt } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix" | "boleto">("credit");
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

  const today = new Date().toLocaleDateString('pt-BR');
  const installments = selectedPlan?.id === 'annual' ? 12 : 3;
  const installmentValue = (implementationPrice / installments).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl mx-auto bg-white"
    >
      <div className="flex items-center justify-between border-b pb-6">
        <img
          src="/lovable-uploads/193914c2-f64d-4f1c-b42e-95d160e8b8d9.png"
          alt="Agrega.ai Logo"
          className="h-12"
        />
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900">Contrato de Prestação de Serviços</h1>
          <p className="text-sm text-gray-500">Data: {today}</p>
        </div>
      </div>

      <Card className="p-6 bg-orange-50/50 border border-orange-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <File className="h-5 w-5 text-orange-500" />
            <h2>Resumo do Plano {selectedPlan?.name}</h2>
          </div>
          
          <div className="grid gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Plano:</span>
              <span className="font-medium text-gray-900">{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Implementação:</span>
              <span className="font-medium text-gray-900">{formatPrice(implementationPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Manutenção Mensal:</span>
              <span className="font-medium text-gray-900">{formatPrice(maintenancePrice)}</span>
            </div>
            {revenueShare > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue Share:</span>
                <span className="font-medium text-gray-900">{revenueSharePercent}%</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-6 text-gray-700">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold text-gray-900">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h3>
          
          <p className="text-sm leading-relaxed">
            Por este instrumento particular, de um lado <strong>AGREGA AI TECNOLOGIA LTDA</strong>, 
            inscrita no CNPJ sob nº XX.XXX.XXX/0001-XX, doravante denominada <strong>CONTRATADA</strong>, 
            e de outro lado a pessoa física ou jurídica identificada no cadastro eletrônico, 
            doravante denominada <strong>CONTRATANTE</strong>, têm entre si justo e acordado o seguinte:
          </p>

          <h4 className="text-base font-medium mt-4 mb-2">1. OBJETO</h4>
          <p className="text-sm leading-relaxed">
            O presente contrato tem por objeto a prestação de serviços de desenvolvimento e 
            manutenção de plataforma digital no plano {selectedPlan?.name}, conforme escopo detalhado abaixo:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {selectedTasks.map((task) => (
              <li key={task.name} className="text-gray-700">{task.name}</li>
            ))}
          </ul>

          <h4 className="text-base font-medium mt-4 mb-2">2. VALORES E CONDIÇÕES DE PAGAMENTO</h4>
          <p className="text-sm leading-relaxed">
            Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA os seguintes valores:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Implementação: {formatPrice(implementationPrice)} em até {installments}x de {formatPrice(Number(installmentValue))}</li>
            <li>Manutenção Mensal: {formatPrice(maintenancePrice)}</li>
            {revenueShare > 0 && (
              <li>Revenue Share: {revenueSharePercent}% sobre o faturamento mensal</li>
            )}
          </ul>
        </div>

        <Card className="p-6 bg-orange-50/50 border border-orange-100">
          <h4 className="text-base font-medium mb-4">3. MÉTODO DE PAGAMENTO</h4>
          <RadioGroup value={paymentMethod} onValueChange={(value: "credit" | "pix" | "boleto") => setPaymentMethod(value)} className="space-y-4">
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-orange-100 cursor-pointer hover:border-orange-300 transition-colors">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4 text-orange-500" />
                Cartão de Crédito
                <span className="text-sm text-gray-500">(até {installments}x)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-orange-100 cursor-pointer hover:border-orange-300 transition-colors">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                <QrCode className="h-4 w-4 text-orange-500" />
                PIX
              </Label>
            </div>
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-orange-100 cursor-pointer hover:border-orange-300 transition-colors">
              <RadioGroupItem value="boleto" id="boleto" />
              <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                <Receipt className="h-4 w-4 text-orange-500" />
                Boleto Bancário
                <span className="text-sm text-gray-500">(vencimento em 3 dias)</span>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">CONTRATADA</p>
            <div className="h-0.5 bg-gray-300 w-full mt-12"></div>
            <p className="text-sm font-medium">Agrega.ai Tecnologia LTDA</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">CONTRATANTE</p>
            <div className="h-0.5 bg-gray-300 w-full mt-12"></div>
            <p className="text-sm font-medium">Cliente</p>
          </div>
        </div>

        <div className="space-y-2 mt-8">
          <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
            <Mail className="h-4 w-4" />
            Digite seu e-mail para receber o contrato
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleSignContract}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Check className="w-4 h-4 mr-2" />
          Assinar & Enviar Contrato
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          Ao clicar em assinar, você concorda com os termos deste contrato e receberá uma cópia por e-mail
        </p>
      </div>
    </motion.div>
  );
};

export default ContractStep;