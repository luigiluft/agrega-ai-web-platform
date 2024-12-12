import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Upload, Crop, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

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

const PromotionsManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="banners" className="w-full">
        <TabsList>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="promotions">Promoções</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Adicionar Novo Banner</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Banner</Label>
                  <Input id="title" placeholder="Ex: Black Friday 2024" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Posição na Tela</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a posição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Topo</SelectItem>
                      <SelectItem value="sidebar">Lateral</SelectItem>
                      <SelectItem value="bottom">Rodapé</SelectItem>
                      <SelectItem value="popup">Pop-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Tamanho</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeno (300x250)</SelectItem>
                      <SelectItem value="medium">Médio (728x90)</SelectItem>
                      <SelectItem value="large">Grande (970x250)</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Período de Exibição</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Arraste sua imagem ou</p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="banner-upload"
                      onChange={handleFileSelect}
                    />
                    <Label
                      htmlFor="banner-upload"
                      className="text-sm text-primary hover:underline cursor-pointer"
                    >
                      clique para fazer upload
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG ou GIF (max. 5MB)
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Banner</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Banners Ativos</h3>
            <div className="space-y-4">
              {banners.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Nenhum banner cadastrado
                </p>
              ) : (
                <div className="space-y-4">
                  {/* Banner list would go here */}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="promotions">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Gerenciar Promoções</h3>
            {/* Promotion management content would go here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;