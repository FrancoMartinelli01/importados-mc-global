import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/data/products';
import SEO from '@/components/SEO';

const checkoutSchema = z.object({
  nombre: z.string().trim().min(1, 'Requerido').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  telefono: z.string().trim().min(1, 'Requerido').max(20),
  direccion: z.string().trim().min(1, 'Requerido').max(200),
  ciudad: z.string().trim().min(1, 'Requerido').max(100),
  provincia: z.string().trim().min(1, 'Requerido').max(100),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [processing, setProcessing] = useState(false);
  const total = totalPrice();
  const shipping = total >= 100000 ? 0 : 5990;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0) return <Navigate to="/catalogo" />;

  const onSubmit = async (data: CheckoutForm) => {
    setProcessing(true);
    try {
      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            qty: i.qty,
            price: i.product.price,
          })),
          payer: {
            name: data.nombre,
            email: data.email,
            phone: data.telefono,
            address: data.direccion,
            city: data.ciudad,
            province: data.provincia,
          },
        }),
      });

      if (!res.ok) throw new Error('API error');

      const result = await res.json();
      clearCart();
      window.location.href = result.init_point;
    } catch {
      setProcessing(false);
      toast.error('Hubo un problema al procesar el pago. Intentá de nuevo.');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO title="Checkout | Importados MC" />
      <h1 className="mb-8 text-2xl font-bold text-foreground">Checkout</h1>

      {processing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-background p-8 shadow-2xl">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg font-semibold">Procesando pago...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Datos de envío</h2>
          {([
            ['nombre', 'Nombre completo'],
            ['email', 'Email'],
            ['telefono', 'Teléfono'],
            ['direccion', 'Dirección'],
            ['ciudad', 'Ciudad'],
            ['provincia', 'Provincia'],
          ] as const).map(([field, label]) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
              <input
                {...register(field)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-base"
                placeholder={label}
              />
              {errors[field] && <p className="mt-1 text-xs text-destructive">{errors[field]?.message}</p>}
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Resumen de orden</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
                  <img src={item.product.imageUrl} alt={item.product.name} className="h-14 w-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    {item.selectedSize && <p className="text-xs text-muted-foreground">Talle: {item.selectedSize}</p>}
                    <p className="text-xs text-muted-foreground">x{item.qty}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(item.product.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                <span>Total</span>
                <span>{formatPrice(total + shipping)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-violet-700 transition-base disabled:opacity-50"
            >
              <Zap className="h-4 w-4" />
              Pagar con Mercado Pago
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" /> Pago 100% seguro y encriptado
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
