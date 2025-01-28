import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, Image as ImageIcon, BarChart } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Banner } from "./types";
import { toast } from "sonner";

const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newBanner, setNewBanner] = useState<Partial<Banner>>({
    startDate: new Date(),
    endDate: new Date(),
    position: 'homepage',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to your storage
      const imageUrl = URL.createObjectURL(file);
      setNewBanner({ ...newBanner, imageUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const banner: Banner = {
      id: Date.now().toString(),
      title: newBanner.title || '',
      imageUrl: newBanner.imageUrl || '',
      position: newBanner.position || 'homepage',
      startDate: newBanner.startDate || new Date(),
      endDate: newBanner.endDate || new Date(),
      status: 'scheduled',
      clicks: 0,
      impressions: 0,
    };
    setBanners([...banners, banner]);
    setShowUploadForm(false);
    toast.success("Banner criado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestão de Banners</h2>
        <Button onClick={() => setShowUploadForm(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Novo Banner
        </Button>
      </div>

      {showUploadForm ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Título do Banner</Label>
              <Input
                value={newBanner.title || ''}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                placeholder="Ex: Promoção de Verão"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="banner-upload"
                />
                <Label htmlFor="banner-upload" className="cursor-pointer">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">
                    Clique para fazer upload (JPEG, PNG, GIF)
                  </span>
                </Label>
              </div>
              {newBanner.imageUrl && (
                <img
                  src={newBanner.imageUrl}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Posição</Label>
                <Select
                  value={newBanner.position}
                  onValueChange={(value: Banner['position']) =>
                    setNewBanner({ ...newBanner, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homepage">Página Inicial</SelectItem>
                    <SelectItem value="category">Página de Categorias</SelectItem>
                    <SelectItem value="product">Página de Produtos</SelectItem>
                    <SelectItem value="footer">Rodapé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>URL de destino</Label>
                <Input
                  value={newBanner.url || ''}
                  onChange={(e) => setNewBanner({ ...newBanner, url: e.target.value })}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newBanner.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newBanner.startDate ? (
                        format(newBanner.startDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newBanner.startDate}
                      onSelect={(date) =>
                        date && setNewBanner({ ...newBanner, startDate: date })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Data Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newBanner.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newBanner.endDate ? (
                        format(newBanner.endDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newBanner.endDate}
                      onSelect={(date) =>
                        date && setNewBanner({ ...newBanner, endDate: date })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Upload className="w-4 h-4 mr-2" />
                Publicar Banner
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid gap-4">
          {banners.map((banner) => (
            <Card key={banner.id} className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{banner.title}</h3>
                  <p className="text-sm text-gray-500">
                    {banner.position === 'homepage'
                      ? 'Página Inicial'
                      : banner.position === 'category'
                      ? 'Página de Categorias'
                      : banner.position === 'product'
                      ? 'Página de Produtos'
                      : 'Rodapé'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Válido de {format(banner.startDate, 'dd/MM/yyyy')} até{' '}
                    {format(banner.endDate, 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BarChart className="w-4 h-4" />
                      <span>{banner.impressions} impressões</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{banner.clicks} cliques</span>
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerManager;