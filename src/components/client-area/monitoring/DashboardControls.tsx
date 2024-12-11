import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface DashboardControlsProps {
  onDateChange: (dates: { from: Date; to: Date }) => void;
  onViewChange: (view: string) => void;
}

const DashboardControls = ({ onDateChange, onViewChange }: DashboardControlsProps) => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const handleDateSelect = (dates: DateRange | undefined) => {
    if (!dates) return;
    
    setDate(dates);
    
    if (dates.from && dates.to) {
      onDateChange({
        from: dates.from,
        to: dates.to
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[300px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "P", { locale: ptBR })} -{" "}
                  {format(date.to, "P", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "P", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleDateSelect}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <Select onValueChange={onViewChange} defaultValue="sales">
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Selecione a visualização" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sales">Vendas por Período</SelectItem>
          <SelectItem value="products">Produtos Mais Vendidos</SelectItem>
          <SelectItem value="customers">Clientes Mais Ativos</SelectItem>
          <SelectItem value="tracking">Rastreamento de Pedidos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardControls;