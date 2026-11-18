import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollSequence } from '@/hooks/useScrollSequence';
import { PRODUCTS, formatPrice, getBrand, getShortName } from '@/data/products';

type Chapter = {
  productId: string;
  text: string;
  /** a partir de qué punto del scroll (0 a 1) aparece este producto */
  from: number;
};

type Props = {
  title: string;
  intro: string;
  frames: { dir: string; count: number };
  /** color de fondo: igual al de los videos para que el canvas se funda */
  bg: string;
  dark?: boolean;
  chapters: Chapter[];
  cta: { label: string; to: string };
  /** alto total de la sección en vh: más alto = la animación avanza más lento */
  length?: number;
};

export default function ProductStory({ title, intro, frames, bg, dark = false, chapters, cta, length = 260 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useScrollSequence(wrapRef, canvasRef, frames.dir, frames.count);

  const active = chapters.reduce((acc, c, i) => (progress >= c.from ? i : acc), 0);
  const fg = dark ? 'text-white' : 'text-foreground';
  const muted = dark ? 'text-white/65' : 'text-foreground/65';
  // bordes difuminados para que el video se funda con el fondo de la sección
  const fadeV = 'linear-gradient(to bottom, transparent, black 8%, black 88%, transparent)';
  const fadeH = 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)';
  // en la oscura los bordes del video ya son negros: solo difumino arriba y abajo
  const mask = (
    dark
      ? { WebkitMaskImage: fadeV, maskImage: fadeV }
      : {
          WebkitMaskImage: `${fadeV}, ${fadeH}`,
          WebkitMaskComposite: 'source-in',
          maskImage: `${fadeV}, ${fadeH}`,
          maskComposite: 'intersect',
        }
  ) as React.CSSProperties;

  return (
    <section ref={wrapRef} className="relative" style={{ height: `${length}vh`, background: bg }}>
      <div className="sticky top-[93px] h-[calc(100vh-93px)] overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[1fr_auto] px-4 md:grid-cols-[1fr_auto] md:grid-rows-1 md:items-center md:gap-12">
          {/* Animación */}
          <div className="relative row-start-1 flex min-h-0 items-center justify-center md:col-start-2">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="h-full max-h-[78vh] w-auto max-w-full md:h-[78vh]"
              style={{ aspectRatio: '9 / 16', ...mask }}
            />
          </div>

          {/* Texto */}
          <div className={`relative row-start-2 pb-8 md:col-start-1 md:row-start-1 md:pb-0 ${fg}`}>
            <h2 className="font-display text-[2.3rem] font-black uppercase leading-[0.88] md:text-7xl lg:text-8xl">
              {title}
            </h2>
            <p className={`mt-5 hidden max-w-sm text-base md:block ${muted}`}>{intro}</p>

            <div className="mt-4 grid md:mt-12">
              {chapters.map((c, i) => {
                const p = PRODUCTS.find((x) => x.id === c.productId);
                if (!p) return null;
                const on = i === active;
                return (
                  <div
                    key={c.productId}
                    aria-hidden={!on}
                    className={`[grid-area:1/1] transition-all duration-500 ${
                      on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
                  >
                    <p className={`text-sm font-semibold ${muted}`}>{getBrand(p)}</p>
                    <h3 className="mt-0.5 font-display text-2xl font-extrabold uppercase leading-none md:text-4xl">
                      {getShortName(p)}
                    </h3>
                    <p className={`mt-2 max-w-sm text-sm md:text-[15px] ${muted}`}>{c.text}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <span className="font-display text-2xl font-extrabold leading-none md:text-3xl">{formatPrice(p.price)}</span>
                      <Link
                        to={`/producto/${p.id}`}
                        tabIndex={on ? 0 : -1}
                        className={`text-[15px] font-semibold underline decoration-[3px] underline-offset-4 ${
                          dark ? 'decoration-tag hover:decoration-white' : 'decoration-accent hover:decoration-foreground'
                        }`}
                      >
                        Ver producto
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-5 md:mt-8">
              <Link
                to={cta.to}
                className={`inline-flex h-11 items-center rounded-full px-6 text-[15px] font-semibold transition-base md:h-12 ${
                  dark ? 'bg-white text-foreground hover:bg-tag' : 'bg-foreground text-background hover:bg-accent'
                }`}
              >
                {cta.label}
              </Link>
              {/* avance */}
              <div className={`hidden h-[3px] w-32 overflow-hidden rounded-full md:block ${dark ? 'bg-white/15' : 'bg-foreground/10'}`}>
                <div
                  className={`h-full ${dark ? 'bg-tag' : 'bg-accent'}`}
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
