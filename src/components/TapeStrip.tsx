import { Plane } from 'lucide-react';
import { PRODUCTS, getBrand } from '@/data/products';

const brands = Array.from(new Set(PRODUCTS.map(getBrand).filter(Boolean).map((b) => (b as string).split(' x ')[0])));
const promises = ['100% originales', 'Envíos a todo el país', 'Pagá con Mercado Pago', 'Te ayudamos por WhatsApp'];

function Tape({ items, className, reverse }: { items: string[]; className: string; reverse?: boolean }) {
  // el contenido se repite para que la cinta no se corte en pantallas anchas
  const row = [...items, ...items, ...items];
  return (
    <div className={`flex w-[120%] -translate-x-[8%] overflow-hidden py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] ${className}`}>
      <div
        className="flex w-max animate-marquee items-center will-change-transform motion-reduce:animate-none"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
        aria-hidden="true"
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">{t}</span>
                <Plane className="h-4 w-4 rotate-45 opacity-60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Dos cintas de embalar cruzadas: marcas en una, lo que prometemos en la otra. */
export default function TapeStrip() {
  return (
    <section
      className="relative flex h-44 flex-col justify-center overflow-hidden border-b border-border md:h-56"
      aria-label={`Marcas: ${brands.join(', ')}. ${promises.join('. ')}.`}
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-[112%] -rotate-[3deg]">
        <Tape items={brands} className="bg-foreground text-background" />
      </div>
      <div className="absolute inset-x-0 top-1/2 translate-y-[6%] rotate-[2.5deg]">
        <Tape items={promises} className="bg-tag text-foreground" reverse />
      </div>
    </section>
  );
}
