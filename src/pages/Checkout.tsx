import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SolutionLayout from "@/components/solutions/SolutionLayout";
import { CreditCard, Lock } from "lucide-react";

const Checkout = () => {
  return (
    <SolutionLayout
      title="Checkout"
      subtitle="Complete seu pagamento"
      className="max-w-3xl"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Informações do Cartão</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Data de Expiração</Label>
                <Input id="expiry" placeholder="MM/AA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nome no Cartão</Label>
              <Input id="name" placeholder="NOME COMPLETO" />
            </div>
          </div>
        </Card>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Mensalidade</span>
                <span>R$ 299,90</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>R$ 299,90</span>
              </div>
            </div>
          </Card>
          
          <Button className="w-full h-12" size="lg">
            <Lock className="w-4 h-4 mr-2" />
            Finalizar Pagamento
          </Button>
          
          <div className="flex items-center justify-center text-sm text-gray-500">
            <CreditCard className="w-4 h-4 mr-2" />
            Pagamento seguro via Stripe
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};

export default Checkout;