import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircle, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, getBrand } from '@/data/products';
import { useSearchStore } from '@/store/searchStore';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';

const CATEGORIES = ['Todos', 'Tecnología', 'Indumentaria', 'Accesorios'] as const;

const PRICES = [
  { id: 'todos', label: 'Cualquier precio', min: 0, max: Infinity },
  { id: 'hasta-200', label: 'Hasta $200.000', min: 0, max: 200000 },
  { id: '200-500', label: '$200.000 a $500.000', min: 200000, max: 500000 },
  { id: 'mas-500', label: 'Más de $500.000', min: 500000, max: Infinity },
];

const SORTS = [
  { id: 'destacados', label: 'Destacados' },
  { id: 'menor', label: 'Menor precio' },
  { id: 'mayor', label: 'Mayor precio' },
];

const brandOf = (p: (typeof PRODUCTS)[number]) => (getBrand(p) ?? 'Otras').split(' x ')[0];
const normalize = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Catalogo() {
  const [params, setParams] = useSearchParams();
  const category = params.get('categoria') || 'Todos';
  const brand = params.get('marca') || 'Todas';
  const price = params.get('precio') || 'todos';
  const sort = params.get('orden') || 'destacados';
  const stockOnly = params.get('stock') === '1';
  const qParam = params.get('q');
  const { query, setQuery } = useSearchStore();
  const searchTerm = qParam || '';
  const [sheet, setSheet] = useState(false);

  // los filtros viven en la URL: así se pueden compartir y el botón atrás funciona
  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  useEffect(() => {
    if (!qParam && query) setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // conteos para las pestañas y las marcas (sobre la categoría elegida)
  const inCategory = useMemo(
    () => PRODUCTS.filter((p) => category === 'Todos' || p.category === category),
    [category],
  );
  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    inCategory.forEach((p) => counts.set(brandOf(p), (counts.get(brandOf(p)) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [inCategory]);

  const filtered = useMemo(() => {
    const range = PRICES.find((r) => r.id === price) ?? PRICES[0];
    const q = normalize(searchTerm);
    const list = inCategory.filter((p) => {
      if (brand !== 'Todas' && brandOf(p) !== brand) return false;
      if (p.price < range.min || p.price >= range.max) return false;
      if (stockOnly && p.stock === 0) return false;
      if (q && !normalize(`${p.name} ${p.category} ${getBrand(p) ?? ''}`).includes(q)) return false;
      return true;
    });
    if (sort === 'menor') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'mayor') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [inCategory, brand, price, stockOnly, searchTerm, sort]);

  const activeExtras = [
    price !== 'todos' && { key: 'precio', label: PRICES.find((r) => r.id === price)?.label },
    stockOnly && { key: 'stock', label: 'Solo con stock' },
    searchTerm && { key: 'q', label: `“${searchTerm}”` },
  ].filter(Boolean) as { key: string; label: string }[];

  const title = searchTerm ? 'Resultados' : brand !== 'Todas' ? brand : category === 'Todos' ? 'Catálogo' : category;
  // la clave cambia con los filtros: así la grilla vuelve a "repartir" las tarjetas
  const gridKey = [category, brand, price, sort, stockOnly, searchTerm].join('|');

  const chip = (on: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-base ${
      on ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 bg-white hover:border-foreground/50'
    }`;

  const extraFilters = (
    <>
      <div>
        <p className="mb-2 text-sm font-semibold">Precio</p>
        <div className="flex flex-wrap gap-2">
          {PRICES.map((r) => (
            <button key={r.id} onClick={() => set('precio', r.id === 'todos' ? null : r.id)} className={chip(price === r.id)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Ordenar</p>
        <div className="flex flex-wrap gap-2">
          {SORTS.map((o) => (
            <button key={o.id} onClick={() => set('orden', o.id === 'destacados' ? null : o.id)} className={chip(sort === o.id)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          checked={stockOnly}
          onChange={(e) => set('stock', e.target.checked ? '1' : null)}
          className="h-5 w-5 accent-foreground"
        />
        Solo con stock
      </label>
    </>
  );

  return (
    <div className="pb-20">
      <SEO title="Catálogo | Importados MC" />

      {/* Encabezado + pestañas de categoría */}
      <div className="mx-auto max-w-7xl px-4 pt-10 md:pt-14">
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display text-6xl font-black uppercase leading-[0.85] md:text-8xl">{title}</h1>
          <p className="pb-1 text-[15px] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        <nav className="-mx-4 mt-8 flex gap-6 overflow-x-auto border-b border-border px-4 md:gap-10" aria-label="Categorías">
          {CATEGORIES.map((c) => {
            const n = c === 'Todos' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;
            const on = category === c;
            return (
              <button
                key={c}
                onClick={() => {
                  const next = new URLSearchParams(params);
                  if (c === 'Todos') next.delete('categoria');
                  else next.set('categoria', c);
                  next.delete('marca');
                  setParams(next, { replace: true });
                }}
                aria-current={on ? 'page' : undefined}
                className={`relative shrink-0 pb-3 font-display text-2xl font-extrabold uppercase transition-colors md:text-3xl ${
                  on ? 'text-foreground' : 'text-foreground/35 hover:text-foreground/70'
                }`}
              >
                {c === 'Todos' ? 'Todo' : c}
                <sup className="ml-1 font-sans text-xs font-semibold">{n}</sup>
                <span
                  className={`absolute -bottom-px left-0 h-[3px] bg-tag transition-all duration-300 ${on ? 'w-full' : 'w-0'}`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Barra de filtros: queda pegada arriba al bajar */}
      <div className="sticky top-[93px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <div className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 [scrollbar-width:none]" aria-label="Marcas">
            <button onClick={() => set('marca', null)} className={chip(brand === 'Todas')}>
              Todas las marcas
            </button>
            {brands.map(([b, n]) => (
              <button key={b} onClick={() => set('marca', brand === b ? null : b)} className={chip(brand === b)}>
                {b} <span className="opacity-50">{n}</span>
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <select
              value={price}
              onChange={(e) => set('precio', e.target.value === 'todos' ? null : e.target.value)}
              aria-label="Precio"
              className="h-10 rounded-full border border-foreground/15 bg-white px-4 text-sm font-semibold"
            >
              {PRICES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => set('orden', e.target.value === 'destacados' ? null : e.target.value)}
              aria-label="Ordenar"
              className="h-10 rounded-full border border-foreground/15 bg-white px-4 text-sm font-semibold"
            >
              {SORTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-sm font-semibold">
              <input type="checkbox" checked={stockOnly} onChange={(e) => set('stock', e.target.checked ? '1' : null)} className="h-4 w-4 accent-foreground" />
              Con stock
            </label>
          </div>

          <button
            onClick={() => setSheet(true)}
            className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-foreground/15 bg-white px-4 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
            {activeExtras.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-tag px-1 text-[11px]">{activeExtras.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6">
        {activeExtras.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {activeExtras.map((f) => (
              <button
                key={f.key}
                onClick={() => set(f.key, null)}
                className="flex items-center gap-1.5 rounded-full bg-tag px-3 py-1.5 text-sm font-semibold"
              >
                {f.label} <X className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        )}

        {filtered.length > 0 ? (
          <div key={gridKey} className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="animate-deal motion-reduce:animate-none"
                style={{ animationDelay: `${Math.min(i, 11) * 45}ms`, ['--deal-rot' as string]: `${i % 2 ? 3 : -3}deg` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="font-display text-4xl font-extrabold uppercase leading-none">No hay productos con esos filtros</p>
            <p className="mt-3 text-muted-foreground">
              Probá sacando algún filtro, o escribinos por WhatsApp y lo buscamos por vos en Estados Unidos.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={() => setParams(new URLSearchParams(), { replace: true })} className="h-11 rounded-full border border-foreground/25 px-5 text-sm font-semibold hover:border-foreground">
                Ver todo el catálogo
              </button>
              <a
                href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Estoy%20buscando%20un%20producto%20que%20no%20encuentro%20en%20el%20cat%C3%A1logo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white hover:bg-[#1fb857]"
              >
                <MessageCircle className="h-4 w-4" /> Pedir por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Filtros en el celular */}
      {sheet && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-in slide-in-from-bottom space-y-6 overflow-y-auto rounded-t-2xl bg-background p-5 pb-8">
            <div className="flex items-center justify-between">
              <p className="font-display text-3xl font-extrabold uppercase">Filtros</p>
              <button onClick={() => setSheet(false)} aria-label="Cerrar filtros" className="rounded-full p-2 hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            {extraFilters}
            <button onClick={() => setSheet(false)} className="h-12 w-full rounded-full bg-foreground text-[15px] font-semibold text-background">
              Ver {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
