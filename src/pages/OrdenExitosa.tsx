import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/data/products';
import SEO from '@/components/SEO';

type OrderData = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  province: string;
  items: string;
  total: number;
  date: string;
  shippingMethod?: string;
  shippingZone?: string;
  shippingCost?: number;
};

function buildWhatsAppUrl(order: OrderData, paymentId: string | null) {
  const itemLines = order.items.split(', ').map((i) => `• ${i}`).join('\n');
  const shippingLine = order.shippingMethod
    ? `\n🚚 Envío: ${order.shippingMethod}${order.shippingZone ? ` — ${order.shippingZone}` : ''}${order.shippingCost ? ` (${formatPrice(order.shippingCost)})` : ''}`
    : '';
  const msg = `🛍️ NUEVA ORDEN - Importados MC

📋 Orden: #${order.orderNumber}
📅 Fecha: ${order.date}
💳 Payment ID: ${paymentId ?? 'N/A'}

👤 Cliente: ${order.customerName}
📧 Email: ${order.customerEmail}
📱 Tel: ${order.customerPhone}

🛒 Productos:
${itemLines}

💰 Total: ${formatPrice(order.total)}
${shippingLine}

📦 Envío a:
${order.address}
${order.city}, ${order.province}`;

  return `https://wa.me/5491138086005?text=${encodeURIComponent(msg)}`;
}

export default function OrdenExitosa() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const [order, setOrder] = useState<OrderData | null>(null);

  const whatsappUrl = order ? buildWhatsAppUrl(order, paymentId) : null;

  const openWhatsApp = useCallback(() => {
    if (whatsappUrl) window.open(whatsappUrl, '_blank');
  }, [whatsappUrl]);

  useEffect(() => {
    const raw = localStorage.getItem('mc_last_order');
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as OrderData;
      setOrder(data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!order) return;
    const url = buildWhatsAppUrl(order, paymentId);
    window.open(url, '_blank');
    localStorage.removeItem('mc_last_order');
  }, [order, paymentId]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      <SEO title="¡Compra confirmada! | Importados MC" />

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/15">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold text-foreground">¡Tu pedido fue confirmado!</h1>

      {order ? (
        <>
          <p className="mt-4 text-2xl font-extrabold text-primary">#{order.orderNumber}</p>

          <div className="mt-6 w-full max-w-md rounded-2xl border border-border bg-card p-6 text-left space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Resumen de compra</h2>
            <div className="space-y-1 text-sm text-muted-foreground">
              {order.items.split(', ').map((item, idx) => (
                <p key={idx}>• {item}</p>
              ))}
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-foreground">{formatPrice(order.total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Fecha: {order.date}</p>
          </div>

          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            En breve nos comunicaremos con vos por WhatsApp para coordinar el envío a{' '}
            <span className="font-medium text-foreground">{order.city}, {order.province}</span>.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/catalogo"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-base"
            >
              Ver más productos
            </Link>
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition-base"
            >
              <MessageCircle className="h-4 w-4" />
              Reenviar datos por WhatsApp
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 max-w-md text-muted-foreground">
            Te enviamos un email con los detalles de tu compra. En breve nos ponemos en contacto para coordinar el envío.
          </p>
          <div className="mt-8">
            <Link
              to="/catalogo"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-base"
            >
              Ver más productos
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
