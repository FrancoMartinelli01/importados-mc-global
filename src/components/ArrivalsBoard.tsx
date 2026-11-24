import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { PRODUCTS, formatPrice, getBrand, getShortName } from '@/data/products';

/** Corta en la última palabra que entra, para que el cartel nunca muestre una palabra a medias. */
const fit = (text: string, width: number) => {
  if (text.length <= width) return text;
  const cut = text.slice(0, width + 1).lastIndexOf(' ');
  return cut > 0 ? text.slice(0, cut) : text.slice(0, width);
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const EVERY_MS = 4200;

type Row = { id: string; flight: string; brand: string; name: string; price: string; status: string; low: boolean };

/** Un renglón del cartel: cada letra gira por caracteres al azar hasta caer en la correcta. */
function Flaps({ text, width, className = '' }: { text: string; width: number; className?: string }) {
  const target = fit(text.toUpperCase(), width).padEnd(width, ' ');
  const [shown, setShown] = useState(target);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(target);
      return;
    }
    timers.current.forEach(clearTimeout);
    timers.current = [];
    target.split('').forEach((ch, i) => {
      const spins = ch === ' ' ? 2 : 4 + Math.floor(Math.random() * 4);
      for (let s = 0; s <= spins; s++) {
        const id = window.setTimeout(() => {
          setShown((prev) => {
            const arr = prev.padEnd(width, ' ').split('');
            arr[i] = s === spins ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
            return arr.join('');
          });
        }, i * 28 + s * 55);
        timers.current.push(id);
      }
    });
    return () => timers.current.forEach(clearTimeout);
  }, [target, width]);

  return (
    <span className={`flex gap-[2px] ${className}`} aria-hidden="true">
      {shown.split('').map((c, i) => (
        <span
          key={i}
          className="relative flex h-[1.5em] w-[0.95em] items-center justify-center overflow-hidden rounded-[3px] bg-[#1d1f26] text-[#F4F1E6] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]"
        >
          {c === ' ' ? ' ' : c}
          {/* la línea del medio de cada paleta */}
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/60" />
        </span>
      ))}
    </span>
  );
}

export default function ArrivalsBoard() {
  // mezcla tecnología e indumentaria para que el cartel no repita rubro
  const rows = useMemo<Row[]>(() => {
    const inStock = PRODUCTS.filter((p) => p.stock > 0);
    const tech = inStock.filter((p) => p.category === 'Tecnología');
    const rest = inStock.filter((p) => p.category !== 'Tecnología');
    const mixed: typeof inStock = [];
    for (let i = 0; mixed.length < inStock.length; i++) {
      if (rest[i * 2]) mixed.push(rest[i * 2]);
      if (tech[i]) mixed.push(tech[i]);
      if (rest[i * 2 + 1]) mixed.push(rest[i * 2 + 1]);
      if (i > inStock.length) break;
    }
    return mixed.map((p, i) => ({
      id: p.id,
      flight: `MC ${String(101 + i * 7).padStart(3, '0')}`,
      brand: (getBrand(p) ?? 'Importado').split(' x ')[0],
      name: getShortName(p).replace(/\s*\(.*?\)\s*/g, ' ').trim(),
      price: formatPrice(p.price).replace(/\s/g, ''),
      low: p.stock <= 1 || p.badge === 'Stock limitado',
      status: p.stock <= 1 || p.badge === 'Stock limitado' ? 'Últimas' : 'Disponible',
    }));
  }, []);

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % rows.length), EVERY_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, rows.length]);

  const row = rows[i];
  if (!row) return null;

  return (
    <Link
      to={`/producto/${row.id}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group block rounded-xl bg-[#0F1015] p-3 text-[#F4F1E6] shadow-[0_30px_60px_-30px_rgba(0,0,20,0.8)] ring-1 ring-white/5 sm:p-4"
    >
      <div className="mb-2.5 flex items-center justify-between px-1 text-[11px] font-semibold text-[#F4F1E6]/55 sm:text-xs">
        <span className="flex items-center gap-2">
          <Plane className="h-3.5 w-3.5 rotate-45 text-tag" /> Arribos a Buenos Aires
        </span>
        <span className="hidden sm:inline">Vuelo · Producto · Precio · Estado</span>
      </div>

      {/* texto real para lectores de pantalla */}
      <span className="sr-only" aria-live="polite">
        {`${row.brand} ${row.name}, ${row.price}, ${row.status}`}
      </span>

      <div className="flex items-center gap-3 font-display text-[15px] font-extrabold sm:text-[19px] lg:text-[21px]">
        <Flaps text={row.flight} width={6} className="hidden md:flex" />
        <div className="min-w-0 flex-1 overflow-hidden">
          <Flaps text={`${row.brand} ${row.name}`} width={26} className="hidden xl:flex" />
          <Flaps text={`${row.brand} ${row.name}`} width={20} className="hidden lg:flex xl:hidden" />
          <Flaps text={`${row.brand} ${row.name}`} width={16} className="hidden sm:flex lg:hidden" />
          <Flaps text={row.brand} width={10} className="sm:hidden" />
        </div>
        <Flaps text={row.price} width={8} className="hidden xl:flex" />
        <span
          className={`flex h-[1.5em] shrink-0 items-center rounded-[3px] px-2 text-[0.78em] uppercase tracking-wide ${
            row.low ? 'bg-tag text-foreground' : 'bg-[#2BD576] text-[#05210F]'
          }`}
        >
          {row.status}
        </span>
      </div>
      {/* en el celular el nombre va abajo, en letra común */}
      <p className="mt-2 truncate px-1 text-sm text-[#F4F1E6]/75 sm:hidden">
        {row.name} · {row.price}
      </p>
    </Link>
  );
}
