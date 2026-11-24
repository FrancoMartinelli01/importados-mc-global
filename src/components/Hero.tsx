import { Link } from 'react-router-dom';
import { PRODUCTS, getShortName } from '@/data/products';
import { CUTOUTS } from '@/data/cutouts';

const WA_URL =
  'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20encargar%20un%20producto.';

// Todos los productos con recorte, repartidos en 4 columnas
const withCutout = PRODUCTS.filter((p) => CUTOUTS[p.id]);
const COLUMNS = [0, 1, 2, 3].map((c) => withCutout.filter((_, i) => i % 4 === c));
// cada columna con su velocidad y dirección, para que no se muevan en bloque
const MOTION = [
  { dir: 'up', secs: 46 },
  { dir: 'down', secs: 54 },
  { dir: 'up', secs: 40 },
  { dir: 'down', secs: 50 },
] as const;

function Wall() {
  return (
    <div
      className="group/wall absolute -bottom-[10%] -top-[10%] right-[-6%] flex w-[118%] rotate-[-8deg] gap-3 sm:gap-4 md:right-[1%] md:w-[54%]"
      aria-label="Productos del catálogo"
    >
      {COLUMNS.map((col, c) => (
        <div
          key={c}
          className={`flex-1 will-change-transform group-hover/wall:[animation-play-state:paused] motion-reduce:!animate-none ${
            c === 3 ? 'hidden sm:block' : ''
          }`}
          style={{ animation: `wall-${MOTION[c].dir} ${MOTION[c].secs}s linear infinite` }}
        >
          {/* la lista va dos veces para que el loop no tenga corte */}
          {[...col, ...col].map((p, i) => (
            <div key={`${p.id}-${i}`} className="pb-3 sm:pb-4">
              <Link
                to={`/producto/${p.id}`}
                tabIndex={i < col.length ? 0 : -1}
                aria-hidden={i >= col.length}
                aria-label={getShortName(p)}
                className="group/tile flex aspect-[4/5] items-center justify-center rounded-xl bg-[#F4F0FF] shadow-[0_18px_36px_-18px_rgba(10,0,30,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <img
                  src={CUTOUTS[p.id]}
                  alt=""
                  loading={i < 3 ? 'eager' : 'lazy'}
                  className="h-[76%] w-[76%] object-contain transition-transform duration-300 group-hover/tile:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#2A0B5C] text-white">
      {/* fondo violeta de la marca */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#2A0B5C_0%,#5B21B6_45%,#7C3AED_100%)]" />

      <div className="relative h-[min(calc(100vh-93px),820px)] min-h-[640px]">
        <Wall />
        {/* degradé para que el título se lea sobre el muro */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#2A0B5C_38%,rgba(42,11,92,0.55)_62%,rgba(42,11,92,0)_85%)] md:bg-[linear-gradient(90deg,#2A0B5C_32%,rgba(42,11,92,0.7)_46%,rgba(42,11,92,0)_62%)]"
        />

        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-start px-4 pt-10 md:justify-center md:pt-0">
          <div className="pointer-events-auto max-w-xl">
            <h1 className="font-display text-[clamp(4.4rem,20vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.01em] md:text-[clamp(5.5rem,9.5vw,10rem)]">
              De Miami
              <br />a tu casa.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              Productos originales de tecnología, belleza y lifestyle, con envíos a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/catalogo"
                className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[#2A0B5C] transition-base hover:bg-tag hover:text-foreground"
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
        </div>
      </div>
    </section>
  );
}
