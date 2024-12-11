import { Theme } from "@/components/theme/types";
import { motion } from "framer-motion";

interface ScopePreviewProps {
  selectedTheme: string;
  selectedType: string;
  monthlyVolume: string;
  averageTicket: string;
}

const ScopePreview = ({ selectedTheme, selectedType, monthlyVolume, averageTicket }: ScopePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 right-4 w-64 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl"
    >
      <h3 className="text-lg font-semibold mb-4">Escopo do Projeto</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Tema Selecionado</p>
          <p className="font-medium">{selectedTheme || "Não selecionado"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tipo de Site</p>
          <p className="font-medium">{selectedType || "Não selecionado"}</p>
        </div>
        {monthlyVolume && (
          <div>
            <p className="text-sm text-gray-500">Volume Mensal</p>
            <p className="font-medium">{monthlyVolume} pedidos</p>
          </div>
        )}
        {averageTicket && (
          <div>
            <p className="text-sm text-gray-500">Ticket Médio</p>
            <p className="font-medium">R$ {averageTicket}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScopePreview;