import { useState } from "react";
import OrderStats from "./OrderStats";
import RecentOrders from "./RecentOrders";
import SalesChart from "./SalesChart";
import ProductsChart from "./ProductsChart";
import CustomersChart from "./CustomersChart";
import DashboardControls from "./DashboardControls";
import TrackingMap from "../tracking/TrackingMap";

const MonitoringDashboard = () => {
  const [currentView, setCurrentView] = useState("sales");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const handleDateChange = (dates: { from: Date; to: Date }) => {
    setDateRange(dates);
  };

  const renderChart = () => {
    switch (currentView) {
      case "products":
        return <ProductsChart />;
      case "customers":
        return <CustomersChart />;
      case "tracking":
        return <TrackingMap />;
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
        {currentView !== "tracking" ? (
          <>
            {renderChart()}
            <RecentOrders />
          </>
        ) : (
          <div className="col-span-2">
            {renderChart()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringDashboard;