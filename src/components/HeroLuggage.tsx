import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, getShortName } from '@/data/products';

/**
 * "La valija de Miami": productos reales recortados que caen uno por uno
 * y después flotan con un poco de profundidad siguiendo el mouse.
 * Posiciones en % de la caja (ancho/alto), `depth` = cuánto se mueve con el mouse.
 */
const items = [
  { id: 'buzo-adidas-rosa', img: '/hero/buzo-adidas.webp', left: 0, top: 24, w: 44, rot: -7, depth: 10, z: 1 },
  { id: 'chomba-hugo-f1', img: '/hero/chomba-hugo-f1.webp', left: 53, top: 17, w: 44, rot: 6, depth: 14, z: 2 },
  { id: 'zapatillas-zara', img: '/hero/zapatillas-zara.webp', left: 20, top: 60, w: 52, rot: -5, depth: 22, z: 3 },
  { id: 'apple-watch-s11-46', img: '/hero/apple-watch-46.webp', left: 0, top: 66, w: 23, rot: -12, depth: 30, z: 4 },
  { id: 'airpods-4ta-gen', img: '/hero/airpods-4.webp', left: 77, top: 63, w: 19, rot: 9, depth: 34, z: 4 },
];

export default function HeroLuggage({ tag }: { tag: React.ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);

  // entrada: un frame después de montar, para que la transición arranque desde arriba
  useEffect(() => {
    const t = requestAnimationFrame(() => setLanded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // profundidad con el mouse (solo con mouse fino, no en celulares)
  useEffect(() => {
    const box = boxRef.current;
    if (!box || !window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = box.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        box.style.setProperty('--mx', String(Math.max(-1, Math.min(1, x))));
        box.style.setProperty('--my', String(Math.max(-1, Math.min(1, y))));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={boxRef} className="relative mx-auto aspect-[1/1] w-full max-w-[420px] md:aspect-[4/5] md:max-w-none" style={{ '--mx': 0, '--my': 0 } as React.CSSProperties}>
      {items.map((it, i) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        return (
          <div
            key={it.id}
            className="absolute transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.22,1.2,.36,1)] motion-reduce:transition-none"
            style={{
              left: `${it.left}%`,
              top: `${it.top}%`,
              width: `${it.w}%`,
              zIndex: it.z,
              opacity: landed ? 1 : 0,
              transform: landed ? 'none' : `translateY(-60%) rotate(${it.rot * -1.5}deg)`,
              transitionDelay: `${150 + i * 130}ms`,
            }}
          >
            {/* capa de profundidad: sigue al mouse */}
            <div
              className="transition-transform duration-300 ease-out"
              style={{ transform: `translate(calc(var(--mx) * ${it.depth}px), calc(var(--my) * ${it.depth}px))` }}
            >
              <Link
                to={`/producto/${it.id}`}
                aria-label={p ? getShortName(p) : it.id}
                className="group block animate-float will-change-transform motion-reduce:animate-none"
                style={{ animationDelay: `${i * -1.3}s`, animationDuration: `${6 + i}s` }}
              >
                <img
                  src={it.img}
                  alt=""
                  fetchPriority={i < 2 ? 'high' : 'auto'}
                  className="w-full drop-shadow-[0_24px_24px_rgba(21,23,28,0.22)] transition-transform duration-300 group-hover:-translate-y-2"
                  style={{ transform: `rotate(${it.rot}deg)` }}
                />
                {p && (
                  <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {getShortName(p)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        );
      })}
      {tag}
    </div>
  );
}
