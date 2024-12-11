import { useState } from "react";
import OrderStats from "./OrderStats";
import RecentOrders from "./RecentOrders";
import SalesChart from "./SalesChart";
import ProductsChart from "./ProductsChart";
import CustomersChart from "./CustomersChart";
import DashboardControls from "./DashboardControls";

const MonitoringDashboard = () => {
  const [currentView, setCurrentView] = useState("sales");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const handleDateChange = (dates: { from: Date; to: Date }) => {
    setDateRange(dates);
    // Aqui você pode implementar a lógica para atualizar os dados com base nas datas
  };

  const renderChart = () => {
    switch (currentView) {
      case "products":
        return <ProductsChart />;
      case "customers":
        return <CustomersChart />;
      default:
        return <SalesChart />;
    }
  };

  return (
    <div className="space-y-8">
      <DashboardControls
        onDateChange={handleDateChange}
        onViewChange={setCurrentView}
      />
      <OrderStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderChart()}
        <RecentOrders />
      </div>
    </div>
  );
};

export default MonitoringDashboard;