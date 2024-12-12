import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2, QrCode, Bank } from "lucide-react";
import Image from "next/image";

const PaymentMethods = () => {
  const cards = [
    {
      id: "1",
      last4: "1234",
      brand: "Mastercard",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      last4: "5678",
      brand: "Visa",
      expiry: "08/26",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Formas de Pagamento</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cartão
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">Cartão de Crédito/Débito</p>
                <div className="flex gap-2 mt-2">
                  <img
                    src="/visa.png"
                    alt="Visa"
                    className="h-6 object-contain"
                  />
                  <img
                    src="/mastercard.png"
                    alt="Mastercard"
                    className="h-6 object-contain"
                  />
                  <img
                    src="/elo.png"
                    alt="Elo"
                    className="h-6 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">PIX</p>
                <p className="text-sm text-gray-500">
                  Pagamento instantâneo
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Bank className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">Boleto Bancário</p>
                <p className="text-sm text-gray-500">
                  Vencimento em 3 dias úteis
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Cartões Salvos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <Card key={card.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">
                      {card.brand} **** {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expira em {card.expiry}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {card.isDefault && (
                <div className="mt-3 text-sm text-primary font-medium">
                  Cartão Principal
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;