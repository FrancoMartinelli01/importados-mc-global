import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrdenExitosa() {
  const orderNumber = `#MC-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-foreground">¡Tu pedido fue confirmado!</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Te enviamos un email con los detalles de tu compra. En breve nos ponemos en contacto para coordinar el envío.
      </p>
      <p className="mt-4 text-lg font-semibold text-foreground">Orden {orderNumber}</p>
      <div className="mt-8 flex gap-4">
        <Link to="/catalogo" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-violet-700 transition-base">
          Ver más productos
        </Link>
        <Link to="/" className="rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition-base">
          Inicio
        </Link>
      </div>
    </div>
  );
}
