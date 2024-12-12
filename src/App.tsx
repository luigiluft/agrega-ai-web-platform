import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Themes from "./pages/Themes";
import DynamicCalculator from "./pages/DynamicCalculator";
import B2B from "./pages/solutions/B2B";
import B2C from "./pages/solutions/B2C";
import D2C from "./pages/solutions/D2C";
import Marketplace from "./pages/solutions/Marketplace";
import ClientArea from "./pages/ClientArea";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import ChatWidget from "./components/chat/ChatWidget";
import BusinessIntelligence from "./components/client-area/analytics/BusinessIntelligence";
import LogisticsReverse from "./components/client-area/logistics/LogisticsReverse";
import PromotionsManager from "./components/client-area/promotions/PromotionsManager";
import TrackingMap from "./components/client-area/tracking/TrackingMap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/planos" element={<Pricing />} />
            <Route path="/temas" element={<Themes />} />
            <Route path="/calculadora" element={<DynamicCalculator />} />
            <Route path="/b2b" element={<B2B />} />
            <Route path="/b2c" element={<B2C />} />
            <Route path="/d2c" element={<D2C />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/area-cliente" element={<ClientArea />} />
            <Route path="/area-cliente/checkout" element={<Checkout />} />
            <Route path="/area-cliente/analytics" element={<BusinessIntelligence />} />
            <Route path="/area-cliente/logistics/reverse" element={<LogisticsReverse />} />
            <Route path="/area-cliente/promotions" element={<PromotionsManager />} />
            <Route path="/area-cliente/tracking" element={<TrackingMap />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ChatWidget />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;