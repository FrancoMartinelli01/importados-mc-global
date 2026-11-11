import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import Catalogo from "@/pages/Catalogo";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import OrdenExitosa from "@/pages/OrdenExitosa";
import OrdenFallida from "@/pages/OrdenFallida";
import SobreNosotros from "@/pages/SobreNosotros";
import ComoComprar from "@/pages/ComoComprar";
import Envios from "@/pages/Envios";
import Devoluciones from "@/pages/Devoluciones";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar onCartOpen={() => setCartOpen(true)} />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orden/exitosa" element={<OrdenExitosa />} />
                <Route path="/orden/fallida" element={<OrdenFallida />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/como-comprar" element={<ComoComprar />} />
                <Route path="/envios" element={<Envios />} />
                <Route path="/devoluciones" element={<Devoluciones />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
