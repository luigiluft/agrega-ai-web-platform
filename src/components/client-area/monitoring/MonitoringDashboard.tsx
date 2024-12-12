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

  // Sample products data with realistic quantities
  const products: Product[] = [
    {
      id: "1",
      name: "Smartphone XYZ Pro",
      price: 2499.90,
      sku: "PHONE001",
      stock: 982
    },
    {
      id: "2",
      name: "Tablet ABC Plus",
      price: 1899.90,
      sku: "TAB002",
      stock: 7
    },
    {
      id: "3",
      name: "Notebook Ultra",
      price: 4599.90,
      sku: "NOTE003",
      stock: 68
    },
    {
      id: "4",
      name: "Smart TV 55\"",
      price: 3299.90,
      sku: "TV004",
      stock: 50
    },
    {
      id: "5",
      name: "Fone Bluetooth",
      price: 299.90,
      sku: "AUDIO005",
      stock: 117
    }
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