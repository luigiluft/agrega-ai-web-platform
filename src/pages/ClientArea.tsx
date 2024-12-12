import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SolutionLayout from "@/components/solutions/SolutionLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectDashboard from "@/components/client-area/ProjectDashboard";
import ProjectTimeline from "@/components/client-area/ProjectTimeline";
import MonitoringDashboard from "@/components/client-area/monitoring/MonitoringDashboard";
import ProductManagement from "@/components/client-area/products/ProductManagement";
import DevelopmentRequests from "@/components/client-area/development/DevelopmentRequests";
import BillingDashboard from "@/components/client-area/billing/BillingDashboard";

const ClientArea = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SolutionLayout
      title="Área do Cliente"
      subtitle="Acompanhe o progresso do seu projeto"
      className="max-w-7xl"
    >
      <Tabs defaultValue="project" className="w-full">
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="project">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="billing">Faturamento</TabsTrigger>
        </TabsList>

        <TabsContent value="project">
          <div className="space-y-8">
            <ProjectDashboard />
            <ProjectTimeline />
          </div>
        </TabsContent>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="development">
          <DevelopmentRequests />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringDashboard />
        </TabsContent>

        <TabsContent value="billing">
          <BillingDashboard />
        </TabsContent>
      </Tabs>
    </SolutionLayout>
  );
};

export default ClientArea;