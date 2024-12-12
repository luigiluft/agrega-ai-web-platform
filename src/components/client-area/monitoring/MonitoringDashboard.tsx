import { useState } from "react";
import OrderStats from "./OrderStats";
import RecentOrders from "./RecentOrders";
import SalesChart from "./SalesChart";
import ProductsChart from "./ProductsChart";
import CustomersChart from "./CustomersChart";
import DashboardControls from "./DashboardControls";
import TrackingMap from "../tracking/TrackingMap";
import { Product } from "../products/types";

const MonitoringDashboard = () => {
  const [currentView, setCurrentView] = useState("sales");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Product A",
      price: 99.90,
      sku: "SKU001",
      stock: 50
    },
    {
      id: "2",
      name: "Product B",
      price: 149.90,
      sku: "SKU002",
      stock: 30
    },
    // Add more sample products as needed
  ];

  const handleDateChange = (dates: { from: Date; to: Date }) => {
    setDateRange(dates);
  };

  const renderChart = () => {
    switch (currentView) {
      case "products":
        return <ProductsChart products={products} />;
      case "customers":
        return <CustomersChart />;
      case "tracking":
        return (
          <TrackingMap
            deliveries={[]}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
          />
        );
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
          <div className="col-span-2">{renderChart()}</div>
        )}
      </div>
    </div>
  );
};

export default MonitoringDashboard;