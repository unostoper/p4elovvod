import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import News from "./pages/News";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Confidentiality from "./pages/Confidentiality";
import Oferta from "./pages/Oferta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/captain-hook-panel" element={<Admin />} />
          <Route path="/captain-hook-panel/login" element={<AdminLogin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/confidentiality" element={<Confidentiality />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
