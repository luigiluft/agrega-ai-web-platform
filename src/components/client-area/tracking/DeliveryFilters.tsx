import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DeliveryStatus, StatusConfig } from './types';

interface DeliveryFiltersProps {
  searchQuery: string;
  statusFilter: DeliveryStatus | "all";
  statusConfig: StatusConfig;
  onSearch: (query: string) => void;
  onStatusFilter: (status: DeliveryStatus | "all") => void;
}

const DeliveryFilters = ({
  searchQuery,
  statusFilter,
  statusConfig,
  onSearch,
  onStatusFilter
}: DeliveryFiltersProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por número de rastreio, endereço ou cliente..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={(value) => onStatusFilter(value as DeliveryStatus | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            {Object.entries(statusConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  {React.createElement(config.icon, { className: "h-4 w-4" })}
                  {config.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {Object.entries(statusConfig).map(([key, config]) => (
            <Badge
              key={key}
              variant="secondary"
              className={`flex items-center gap-1 ${
                statusFilter === key ? config.color + " text-white" : ""
              }`}
            >
              {React.createElement(config.icon, { className: "h-3 w-3" })}
              <span>{config.label}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryFilters;