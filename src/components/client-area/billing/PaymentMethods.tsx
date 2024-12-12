import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2 } from "lucide-react";

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
        <h3 className="text-lg font-semibold">Cartões Salvos</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cartão
        </Button>
      </div>

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
                  <p className="text-sm text-gray-500">Expira em {card.expiry}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
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
  );
};

export default PaymentMethods;