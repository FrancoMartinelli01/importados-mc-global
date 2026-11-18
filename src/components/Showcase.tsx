import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice, getShortName } from '@/data/products';

/** Cada escena: el producto recortado flotando sobre la marca gigante, con su color. */
const scenes = [
  { productId: 'airpods-pro-3', word: 'Apple', img: '/destacados/airpods-pro-3.webp', bg: '#D6DEEA', ink: '#1C2B47', h: '46%' },
  { productId: 'bomber-diesel', word: 'Diesel', img: '/destacados/bomber-diesel.webp', bg: '#F5C2A6', ink: '#B8321A', h: '58%' },
  { productId: 'buzo-hugo-redbull', word: 'Hugo', img: '/destacados/buzo-hugo.webp', bg: '#FFD84A', ink: '#1B35C9', h: '62%' },
  { productId: 'gopro-hero13', word: 'GoPro', img: '/destacados/gopro-hero13.webp', bg: '#BFE2EE', ink: '#0E6C92', h: '44%' },
  { productId: 'apple-watch-s11-42', word: 'Watch', img: '/destacados/apple-watch.webp', bg: '#E4E1DA', ink: '#2E2A24', h: '50%' },
];

const AUTOPLAY_MS = 5500;

export default function Showcase() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const go = useCallback((step: 1 | -1) => {
    setDir(step);
    setIndex((i) => (i + step + scenes.length) % scenes.length);
  }, []);

  // pasa solo, pero únicamente cuando la sección está en pantalla y nadie la está tocando
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!visible || paused || reduce) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, visible, paused, go]);

  // deslizar con el dedo en el celular
  const touchX = useRef<number | null>(null);

  const scene = scenes[index];
  const product = PRODUCTS.find((p) => p.id === scene.productId);

  return (
    <section
      ref={ref}
      aria-roledescription="carrusel"
      aria-label="Productos destacados"
      className="relative overflow-hidden transition-colors duration-700 ease-out"
      style={{ background: scene.bg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="relative mx-auto h-[min(88vh,760px)] min-h-[560px] max-w-7xl px-4">
        {/* Marca gigante detrás */}
        {scenes.map((s, i) => (
          <div
            key={s.word}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 flex h-[42%] items-center justify-center md:h-full"
          >
            <p
              className="select-none whitespace-nowrap font-display font-black uppercase leading-[0.8] transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                color: s.ink,
                fontSize: 'clamp(6.5rem, 29vw, 26rem)',
                opacity: i === index ? 1 : 0,
                transform: `scale(${i === index ? 1 : 0.94})`,
              }}
            >
              {s.word}
            </p>
          </div>
        ))}

        {/* Producto */}
        {scenes.map((s, i) => (
          <img
            key={s.img}
            src={s.img}
            alt={i === index ? product?.name ?? s.word : ''}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="pointer-events-none absolute left-1/2 top-[50%] w-auto [--k:0.74] md:top-[39%] md:[--k:1] max-w-[86%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.22)] transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] md:top-1/2"
            style={{
              height: `calc(${s.h} * var(--k))`,
              opacity: i === index ? 1 : 0,
              transform: `translate(-50%, -50%) translateY(${i === index ? 0 : 6}%) rotate(${i === index ? 0 : dir * 8}deg) scale(${i === index ? 1 : 0.9})`,
            }}
          />
        ))}

        {/* Info y controles */}
        <div className="absolute inset-x-4 bottom-6 flex flex-col gap-5 md:bottom-10 md:flex-row md:items-end md:justify-between" style={{ color: scene.ink }}>
          <div aria-live="polite" className="max-w-xs">
            {product && (
              <>
                <h2 className="font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">{getShortName(product)}</h2>
                <div className="mt-2 flex items-center gap-4">
                  <span className="font-display text-2xl font-extrabold leading-none">{formatPrice(product.price)}</span>
                  <Link
                    to={`/producto/${product.id}`}
                    className="text-[15px] font-semibold underline decoration-[3px] underline-offset-4 hover:opacity-70"
                  >
                    Ver producto
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5" role="tablist" aria-label="Elegir producto">
              {scenes.map((s, i) => (
                <button
                  key={s.word}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.word}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === index ? 28 : 10, background: scene.ink, opacity: i === index ? 1 : 0.3 }}
                />
              ))}
            </div>
            <button
              onClick={() => go(-1)}
              aria-label="Producto anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-base hover:bg-black/5"
              style={{ borderColor: scene.ink }}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Producto siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-base hover:bg-black/5"
              style={{ borderColor: scene.ink }}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
