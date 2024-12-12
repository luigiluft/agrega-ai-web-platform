import { Card } from "@/components/ui/card";

const ProductTemplate = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Modelo de Referência</h3>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium">Campos Importantes:</h4>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li>• Nome do produto (obrigatório)</li>
            <li>• SKU único (obrigatório)</li>
            <li>• Preço de venda (obrigatório)</li>
            <li>• Quantidade em estoque</li>
            <li>• Descrição detalhada</li>
            <li>• Fotos do produto</li>
            <li>• Marketplaces integrados</li>
            <li>• Categoria do produto</li>
            <li>• Tags para busca</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium">Dicas:</h4>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li>• Use fotos de alta qualidade</li>
            <li>• Mantenha descrições claras</li>
            <li>• Atualize o estoque regularmente</li>
            <li>• Monitore as vendas por marketplace</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ProductTemplate;