import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Percent } from "lucide-react";
import { toast } from "sonner";
import PromotionForm from "./PromotionForm";

interface Promotion {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  startDate: Date;
  endDate: Date;
  minPurchase?: number;
  maxDiscount?: number;
  applicableProducts: "all" | "specific" | "category";
  active: boolean;
}

const PromotionsManager = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [showPromotionForm, setShowPromotionForm] = useState(false);

  const handlePromotionSubmit = (data: any) => {
    const newPromotion: Promotion = {
      id: Date.now().toString(),
      ...data,
      active: true,
    };
    setPromotions([...promotions, newPromotion]);
    setShowPromotionForm(false);
    toast.success("Promoção criada com sucesso!");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="promotions" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="promotions">Promoções</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
        </TabsList>

        <TabsContent value="promotions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gerenciar Promoções</h2>
            <Button onClick={() => setShowPromotionForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Promoção
            </Button>
          </div>

          {showPromotionForm ? (
            <PromotionForm
              onSubmit={handlePromotionSubmit}
              onCancel={() => setShowPromotionForm(false)}
            />
          ) : (
            <div className="grid gap-4">
              {promotions.map((promotion) => (
                <Card key={promotion.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{promotion.name}</h3>
                      <p className="text-sm text-gray-500">
                        {promotion.type === "percentage" ? `${promotion.value}% de desconto` : `R$ ${promotion.value} de desconto`}
                      </p>
                      <p className="text-xs text-gray-400">
                        Válido de {promotion.startDate.toLocaleDateString()} até {promotion.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remover
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="banners">
          {/* Add banner management code here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;
