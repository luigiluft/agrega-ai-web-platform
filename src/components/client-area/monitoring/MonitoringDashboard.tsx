import OrderStats from "./OrderStats";
import RecentOrders from "./RecentOrders";
import SalesChart from "./SalesChart";

const MonitoringDashboard = () => {
  return (
    <div className="space-y-8">
      <OrderStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
};

export default MonitoringDashboard;