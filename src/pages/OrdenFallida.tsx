import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function OrdenFallida() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
        <XCircle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-3xl font-bold text-foreground">Hubo un problema con el pago</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        No pudimos procesar tu pago. Por favor intentá nuevamente o contactanos para que podamos ayudarte.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/checkout" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-violet-700 transition-base">
          Reintentar
        </Link>
        <Link to="/" className="rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition-base">
          Inicio
        </Link>
      </div>
    </div>
  );
}
