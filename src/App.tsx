import { Suspense, lazy, useState } from 'react';
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
// El home carga de entrada; el resto de las páginas se baja recién cuando se visitan
const Catalogo = lazy(() => import("@/pages/Catalogo"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrdenExitosa = lazy(() => import("@/pages/OrdenExitosa"));
const OrdenFallida = lazy(() => import("@/pages/OrdenFallida"));
const SobreNosotros = lazy(() => import("@/pages/SobreNosotros"));
const ComoComprar = lazy(() => import("@/pages/ComoComprar"));
const Envios = lazy(() => import("@/pages/Envios"));
const Devoluciones = lazy(() => import("@/pages/Devoluciones"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
              <Suspense fallback={<div className="min-h-[60vh]" />}>
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
              </Suspense>
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
