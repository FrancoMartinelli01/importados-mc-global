import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <>
      <section
        className="relative overflow-hidden px-4 py-24 md:py-36"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(109,40,217,0.4) 100%)' }} />
        <div className="mx-auto max-w-4xl text-center">
          {/* Pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Nuevos ingresos disponibles
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            Lo mejor del mundo,
            <br />
            <span className="text-violet-400">en tu puerta.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Tecnología, indumentaria y accesorios importados. Directamente de origen a Argentina.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-700 transition-base"
            >
              Ver Novedades <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/catalogo?categoria=Tecnología"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-base"
            >
              Tecnología
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-border bg-background py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-4 text-sm text-muted-foreground md:gap-10">
          <span>🚚 Envío a todo el país</span>
          <span>🛡️ Compra protegida</span>
          <span>📦 Producto 100% original</span>
          <span>⚡ Pago con Mercado Pago</span>
        </div>
      </div>
    </>
  );
}
