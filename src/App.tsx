import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import NavigationMenu from "@/components/NavigationMenu";
import Index from "@/pages/Index";
import DynamicCalculator from "@/pages/DynamicCalculator";
import Login from "@/pages/Login";
import ClientArea from "@/pages/ClientArea";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculadora" element={<DynamicCalculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/area-cliente" element={<ClientArea />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;