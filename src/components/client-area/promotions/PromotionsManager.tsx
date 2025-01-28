import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Percent } from "lucide-react";
import { toast } from "sonner";
import PromotionForm from "./PromotionForm";
import BannerManager from "./BannerManager";
import { EnhancedPromotion } from "./types";

const PromotionsManager = () => {
  const [promotions, setPromotions] = useState<EnhancedPromotion[]>([]);
  const [showPromotionForm, setShowPromotionForm] = useState(false);

  const handlePromotionSubmit = (data: any) => {
    const newPromotion: EnhancedPromotion = {
      id: Date.now().toString(),
      ...data,
      status: 'active',
      usageCount: 0,
      metrics: {
        sales: 0,
        revenue: 0,
        averageOrderValue: 0,
      },
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
                        {promotion.type === "percentage"
                          ? `${promotion.value}% de desconto`
                          : promotion.type === "fixed"
                          ? `R$ ${promotion.value} de desconto`
                          : promotion.type === "bogo"
                          ? "Compre 1, Leve 2"
                          : "Frete Grátis"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Válido de {promotion.startDate.toLocaleDateString()} até{" "}
                        {promotion.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      <div>
                        {promotion.metrics?.sales || 0} vendas
                      </div>
                      <div>
                        R$ {promotion.metrics?.revenue.toFixed(2)} em receita
                      </div>
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
          <BannerManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;