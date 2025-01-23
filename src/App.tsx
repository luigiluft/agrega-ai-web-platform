import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DynamicCalculator from "./pages/DynamicCalculator";
import ClientArea from "./pages/ClientArea";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/calculadora" element={<DynamicCalculator />} />
        <Route path="/area-do-cliente/*" element={<ClientArea />} />
      </Routes>
      <Toaster />
      <SonnerToaster position="top-right" />
    </Router>
  );
}

export default App;