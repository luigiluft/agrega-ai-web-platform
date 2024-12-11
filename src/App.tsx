import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Themes from "./pages/Themes";
import Calculator from "./pages/Calculator";
import DynamicCalculator from "./pages/DynamicCalculator";
import B2B from "./pages/solutions/B2B";
import B2C from "./pages/solutions/B2C";
import D2C from "./pages/solutions/D2C";
import Marketplace from "./pages/solutions/Marketplace";
import ChatWidget from "./components/chat/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planos" element={<Pricing />} />
          <Route path="/temas" element={<Themes />} />
          <Route path="/calculadora" element={<Calculator />} />
          <Route path="/calculadora-dinamica" element={<DynamicCalculator />} />
          <Route path="/b2b" element={<B2B />} />
          <Route path="/b2c" element={<B2C />} />
          <Route path="/d2c" element={<D2C />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;