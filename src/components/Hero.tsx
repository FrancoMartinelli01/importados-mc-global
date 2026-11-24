import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import HeroLuggage from '@/components/HeroLuggage';
import ArrivalsBoard from '@/components/ArrivalsBoard';

const WA_URL =
  'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20encargar%20un%20producto.';

function BaggageTag() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[-9%] z-10 w-40 -translate-x-1/2 sm:top-[-6%] sm:w-44" aria-hidden="true">
    <div className="origin-top animate-swing [animation-delay:1.1s]">
      {/* cordón */}
      <div className="mx-auto h-10 w-px bg-white/70" />
      <div className="relative rounded-[10px] bg-tag px-4 pb-4 pt-6 text-foreground shadow-[0_22px_40px_-16px_rgba(0,6,60,0.6)]">
        <span className="absolute left-1/2 top-2.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-background ring-2 ring-foreground/15 bg-accent" />
        <div className="flex items-end justify-between font-display font-black leading-none">
          <span className="text-3xl sm:text-4xl">MIA</span>
          <Plane className="mb-1.5 h-5 w-5 rotate-45" strokeWidth={2.5} />
          <span className="text-3xl sm:text-4xl">EZE</span>
        </div>
        <div className="mt-3 border-t-2 border-dashed border-foreground/30 pt-2.5 text-[13px] leading-snug">
          <p className="font-semibold">Destino: tu casa</p>
          <p className="text-foreground/70">Importados MC</p>
        </div>
        {/* "código de barras" */}
        <div className="mt-3 flex h-7 items-stretch gap-[2px]">
          {[3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2].map((w, i) => (
            <span key={i} className="bg-foreground" style={{ width: w * 1.5 }} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent text-white">
      {/* ruta punteada de fondo, como en un mapa de vuelos */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="none" viewBox="0 0 1440 800">
        <path d="M -40 640 C 380 420, 760 760, 1500 120" fill="none" stroke="white" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-10 md:pb-8 md:pt-10">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-4">
          <div className="relative z-10">
            <h1 className="font-display text-[clamp(4.6rem,22vw,7.5rem)] font-black uppercase leading-[0.8] tracking-[-0.01em] md:text-[clamp(5.5rem,min(11vw,17vh),11rem)]">
              De Miami
              <br />a tu casa.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/80">
              Productos originales de tecnología, belleza y lifestyle, con envíos a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/catalogo"
                className="inline-flex h-12 items-center rounded-full bg-tag px-7 text-[15px] font-semibold text-foreground transition-base hover:bg-white"
              >
                Ver el catálogo
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-[15px] font-semibold transition-base hover:border-white hover:bg-white/10"
              >
                Encargar algo que no está
              </a>
            </div>
          </div>

          <div className="mt-16 md:-ml-16 md:-mr-6 md:mt-10">
            <HeroLuggage tag={<BaggageTag />} />
          </div>
        </div>

        <div className="mt-6 md:mt-4">
          <ArrivalsBoard />
        </div>
      </div>
    </section>
  );
}
