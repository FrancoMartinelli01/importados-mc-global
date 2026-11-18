import { Instagram } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

// posición de arranque: todas juntas en el centro, giradas como un mazo
const stack = [
  { x: 150, r: -7 },
  { x: 50, r: -2 },
  { x: -50, r: 3 },
  { x: -150, r: 8 },
];

const shots = ['/Hugo-estampada-1.jpeg', '/Campera-Michael -Kors-1.jpeg', '/Musculosa-mujer-diesel-1.jpeg', '/Rompe-viento-diesel-1.jpeg'];

export default function InstagramBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] md:text-6xl">
            Los ingresos, en Instagram
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Somos más de 80 mil. Ahí mostramos lo que va llegando en reels e historias.
          </p>
          <a
            href="https://instagram.com/importados.mc_"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-semibold text-background transition-base hover:bg-accent"
          >
            <Instagram className="h-4 w-4" /> Seguir a @importados.mc_
          </a>
        </div>
        <div ref={ref} className="grid grid-cols-4 gap-2">
          {shots.map((s, i) => (
            <a
              key={s}
              href="https://instagram.com/importados.mc_"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden="true"
              className={`overflow-hidden rounded-md bg-white shadow-[0_14px_30px_-18px_rgba(0,0,0,0.5)] transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] ${i % 2 ? 'mt-8' : ''}`}
              style={{ transform: inView ? 'none' : `translateX(${stack[i].x}%) rotate(${stack[i].r}deg)`, transitionDelay: `${150 + i * 90}ms`, zIndex: 4 - i }}
            >
              <img src={s} alt="" loading="lazy" className="aspect-[9/16] w-full object-cover transition-transform duration-500 hover:scale-105" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
