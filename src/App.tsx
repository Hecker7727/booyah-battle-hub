
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SquadFinder from "./pages/SquadFinder";
import Clips from "./pages/Clips";
import Tournaments from "./pages/Tournaments";
import News from "./pages/News";
import Forums from "./pages/Forums";
import Login from "./pages/Login";
import Guides from "./pages/Guides";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/squad-finder" element={<SquadFinder />} />
          <Route path="/clips" element={<Clips />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:category" element={<Guides />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
