import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Upload, Crop, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Plus, Percent } from "lucide-react";
import { toast } from "sonner";
import PromotionForm from "./PromotionForm";

interface Banner {
  id: string;
  title: string;
  image: string;
  position: string;
  size: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

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
  const [banners, setBanners] = useState<Banner[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPromotionForm, setShowPromotionForm] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
      <Tabs defaultValue="banners" className="w-full">
        <TabsList>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="promotions">Promoções</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="space-y-6">
          {/* Add banner management code here */}
        </TabsContent>

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
      </Tabs>
    </div>
  );
};

export default PromotionsManager;
