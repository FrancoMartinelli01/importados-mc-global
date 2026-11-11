import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Loader2, Zap, Truck, Clock, MapPin, Package, MessageCircle } from 'lucide-react';
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

type ShippingMethod = 'estandar' | 'express' | 'retiro' | 'interior';

const STANDARD_ZONES = [
  { value: 'caba', label: 'CABA', cost: 6500 },
  { value: 'gba-norte', label: 'GBA Norte', cost: 7500 },
  { value: 'gba-sur', label: 'GBA Sur', cost: 7500 },
  { value: 'sin-cobertura', label: 'Florencio Varela / Ezeiza / Escobar / Laferrere / González Catán', cost: 0 },
] as const;

type ZoneValue = typeof STANDARD_ZONES[number]['value'];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState<ShippingMethod>('estandar');
  const [zone, setZone] = useState<ZoneValue | ''>('');
  const total = totalPrice();

  const shipping = useMemo(() => {
    if (method === 'estandar' && zone) {
      const z = STANDARD_ZONES.find((x) => x.value === zone);
      return z?.cost ?? 0;
    }
    return 0;
  }, [method, zone]);

  const shippingLabel = useMemo(() => {
    if (method === 'estandar') {
      if (!zone) return 'Seleccioná zona';
      if (zone === 'sin-cobertura') return 'A coordinar';
      return formatPrice(shipping);
    }
    if (method === 'express' || method === 'interior') return 'A confirmar';
    if (method === 'retiro') return 'Gratis';
    return '—';
  }, [method, zone, shipping]);

  const isMorning = new Date().getHours() < 9;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0) return <Navigate to="/catalogo" />;

  const methodLabel = (m: ShippingMethod) => ({
    estandar: 'Envío estándar (48hs)',
    express: 'Envío express (en el día)',
    retiro: 'Retiro en punto - Ramos Mejía',
    interior: 'Envío al interior',
  }[m]);

  const zoneLabel = (z: ZoneValue | '') => STANDARD_ZONES.find((x) => x.value === z)?.label ?? '';

  const onSubmit = async (data: CheckoutForm) => {
    if (method === 'estandar' && !zone) {
      toast.error('Seleccioná una zona de envío');
      return;
    }

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

      const shippingMethodLabel = methodLabel(method);
      const shippingZoneLabel = method === 'estandar' ? zoneLabel(zone) : '';

      localStorage.setItem('mc_last_order', JSON.stringify({
        orderNumber: `MC-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: data.nombre,
        customerEmail: data.email,
        customerPhone: data.telefono,
        address: data.direccion,
        city: data.ciudad,
        province: data.provincia,
        items: items.map((i) => `${i.product.name} x${i.qty}`).join(', '),
        total: total + shipping,
        date: new Date().toLocaleDateString('es-AR'),
        shippingMethod: shippingMethodLabel,
        shippingZone: shippingZoneLabel,
        shippingCost: shipping,
      }));

      clearCart();
      window.location.href = result.init_point;
    } catch {
      setProcessing(false);
      toast.error('Hubo un problema al procesar el pago. Intentá de nuevo.');
    }
  };

  const methodOptions: { value: ShippingMethod; title: string; subtitle: string; icon: typeof Truck }[] = [
    { value: 'estandar', title: 'Envío estándar', subtitle: '48hs · Seleccionar zona', icon: Truck },
    { value: 'express', title: 'Envío express', subtitle: 'En el día · Consultar por WhatsApp', icon: Clock },
    { value: 'retiro', title: 'Retiro en punto', subtitle: 'Ramos Mejía · Sin costo', icon: MapPin },
    { value: 'interior', title: 'Envío al interior', subtitle: 'Costo a calcular en destino', icon: Package },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO title="Checkout | Importados MC" />
      <h1 className="mb-8 text-4xl font-black text-foreground uppercase leading-[0.95]">Checkout</h1>

      {processing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-md bg-background p-8 shadow-2xl">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg font-semibold">Procesando pago...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-4">
            <h2 className="font-sans text-lg font-semibold text-foreground">Datos de envío</h2>
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

          <div className="space-y-4">
            <h2 className="font-sans text-lg font-semibold text-foreground">Método de envío</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {methodOptions.map(({ value, title, subtitle, icon: Icon }) => {
                const selected = method === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMethod(value)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-base ${
                      selected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                    <span className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${selected ? 'border-primary bg-primary' : 'border-border'}`} />
                  </button>
                );
              })}
            </div>

            {method === 'estandar' && (
              <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                <label className="block text-sm font-medium text-foreground">Zona de entrega</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as ZoneValue)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Seleccioná tu zona</option>
                  {STANDARD_ZONES.map((z) => (
                    <option key={z.value} value={z.value}>
                      {z.label} {z.cost > 0 ? `— ${formatPrice(z.cost)}` : ''}
                    </option>
                  ))}
                </select>

                {zone === 'sin-cobertura' && (
                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-foreground">
                    Tu zona no tiene cobertura por mensajería. Te contactamos para coordinar envío por correo.
                  </div>
                )}
              </div>
            )}

            {method === 'express' && (
              <div className="space-y-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="text-sm text-primary font-medium">
                  ¿Necesitás tu pedido hoy? Consultanos por WhatsApp y te confirmamos el envío express en minutos.
                </p>
                <a
                  href="https://wa.me/5491138086005?text=Hola%20Importados%20MC!%20Quiero%20consultar%20el%20envío%20express%20para%20mi%20pedido."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition-base"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar por WhatsApp
                </a>
              </div>
            )}

            {method === 'retiro' && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm text-foreground">
                Retiro coordinado en Ramos Mejía. Una vez confirmada la compra te contactamos para coordinar día y horario.
              </div>
            )}

            {method === 'interior' && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm text-foreground">
                Realizamos envíos a todo el país mediante Vía Cargo u otros transportes. El costo se abona en destino y se calcula según destino y tamaño del paquete. Te enviamos el comprobante y seguimiento una vez despachado.
              </div>
            )}

            {(method === 'estandar' || method === 'express') && (
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                  isMorning
                    ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                    : 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400'
                }`}
              >
                {isMorning ? '✓ Comprando ahora, se despacha hoy' : '⏱ Comprando ahora, se despacha el próximo día hábil'}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-md border border-border bg-card p-6 space-y-4">
            <h2 className="font-sans text-lg font-semibold text-foreground">Resumen de orden</h2>
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
                <span>{shippingLabel}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                <span>Total</span>
                <span>{formatPrice(total + shipping)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-base disabled:opacity-50"
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
