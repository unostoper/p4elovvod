import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTrackVisit } from "@/hooks/useTrackVisit";
import Index from "./pages/Index";
import News from "./pages/News";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Confidentiality from "./pages/Confidentiality";
import Oferta from "./pages/Oferta";
import Blog from "./pages/Blog";
import FreeKey from "./pages/FreeKey";
import PirateRadio from "./pages/pirate-radio/PirateRadio";
import PageGuard from "./components/PageGuard";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useTrackVisit();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/news" element={<PageGuard pageKey="page_news"><News /></PageGuard>} />
      <Route path="/captain-hook-panel" element={<Admin />} />
      <Route path="/captain-hook-panel/login" element={<AdminLogin />} />
      <Route path="/shop" element={<PageGuard pageKey="page_shop"><Shop /></PageGuard>} />
      <Route path="/shop/:productId" element={<PageGuard pageKey="page_shop"><ProductDetail /></PageGuard>} />
      <Route path="/confidentiality" element={<Confidentiality />} />
      <Route path="/oferta" element={<Oferta />} />
      <Route path="/blog" element={<PageGuard pageKey="page_blog"><Blog /></PageGuard>} />
      <Route path="/blog/:postId" element={<PageGuard pageKey="page_blog"><Blog /></PageGuard>} />
      <Route path="/free-key" element={<FreeKey />} />
      <Route path="/pirate-radio/*" element={<PirateRadio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
