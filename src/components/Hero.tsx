import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

const WA_URL =
  'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20encargar%20un%20producto.';

function BaggageTag() {
  return (
    <div
      className="absolute -top-2 left-4 z-10 w-48 origin-top animate-swing sm:-left-16 sm:top-10 sm:w-60"
      aria-hidden="true"
    >
      {/* cordón */}
      <div className="mx-auto h-10 w-px bg-foreground/60" />
      <div className="relative rounded-[10px] bg-tag px-4 pb-4 pt-6 text-foreground shadow-[0_18px_40px_-18px_rgba(21,23,28,0.55)]">
        <span className="absolute left-1/2 top-2.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-background ring-2 ring-foreground/15" />
        <div className="flex items-end justify-between font-display font-black leading-none">
          <span className="text-[2.6rem] sm:text-5xl">MIA</span>
          <Plane className="mb-1.5 h-5 w-5 rotate-45" strokeWidth={2.5} />
          <span className="text-[2.6rem] sm:text-5xl">EZE</span>
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
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-16">
        <div>
          <h1 className="font-display text-[clamp(4.5rem,21vw,7rem)] md:text-[clamp(5rem,10.5vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.01em]">
            De Miami
            <br />a tu casa.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Ropa de marca y tecnología original, comprada en Estados Unidos y enviada a cualquier punto de Argentina.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/catalogo"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-[15px] font-semibold text-background transition-base hover:bg-accent"
            >
              Ver el catálogo
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-foreground/25 px-7 text-[15px] font-semibold transition-base hover:border-foreground"
            >
              Encargar algo que no está
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-white">
            <img
              src="/Conjunto-negro-armani-1.jpeg"
              alt="Prendas Armani colgadas en el perchero de Importados MC"
              className="h-full w-full object-cover object-[50%_30%]"
              fetchPriority="high"
            />
          </div>
          <BaggageTag />
        </div>
      </div>
    </section>
  );
}
