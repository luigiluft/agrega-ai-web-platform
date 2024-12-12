import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolutionLayout from "@/components/solutions/SolutionLayout";
import ProjectDashboard from "@/components/client-area/ProjectDashboard";
import ProjectTimeline from "@/components/client-area/ProjectTimeline";
import MonitoringDashboard from "@/components/client-area/monitoring/MonitoringDashboard";
import ProductManagement from "@/components/client-area/products/ProductManagement";
import DevelopmentRequests from "@/components/client-area/development/DevelopmentRequests";

const ClientArea = () => {
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
      </Tabs>
    </SolutionLayout>
  );
};

export default ClientArea;