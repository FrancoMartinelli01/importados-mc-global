import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';
import SearchDropdown from '@/components/SearchDropdown';

const navLinks = [
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Tecnología', to: '/catalogo?categoria=Tecnología' },
  { label: 'Indumentaria', to: '/catalogo?categoria=Indumentaria' },
  { label: 'Cómo comprar', to: '/como-comprar' },
];

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Importados MC, inicio">
      <img src="/logo-mark.webp" alt="" className="h-7 w-auto invert" />
      <span className="font-display text-[1.7rem] font-extrabold uppercase leading-none tracking-tight">
        Importados MC
      </span>
    </Link>
  );
}

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname, location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
  };

  const isActive = (to: string) => {
    const [path, qs] = to.split('?');
    if (location.pathname !== path) return false;
    const current = new URLSearchParams(location.search).get('categoria');
    const target = qs ? new URLSearchParams(qs).get('categoria') : null;
    return current === target;
  };

  const searchInput = (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        aria-label="Buscar productos"
        placeholder="Buscar AirPods, Diesel, Hugo…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-10 w-full rounded-full border border-border bg-white pl-10 pr-4 text-sm outline-none transition-base focus:border-foreground"
      />
      <SearchDropdown />
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="bg-foreground text-background">
        <p className="mx-auto max-w-7xl px-4 py-1.5 text-center text-xs sm:text-[13px]">
          Envío a todo el país y pago con Mercado Pago
        </p>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Wordmark className="shrink-0" />

        <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label="Principal">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={`relative py-1 text-[15px] font-medium transition-base ${
                isActive(l.to) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
              {isActive(l.to) && <span className="absolute -bottom-0.5 left-0 h-[3px] w-full bg-tag" />}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden w-72 md:block lg:ml-0" role="search">
          {searchInput}
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            onClick={onCartOpen}
            aria-label={`Abrir carrito, ${totalItems} productos`}
            className="relative flex h-10 items-center gap-2 rounded-full px-3 transition-base hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden text-sm font-medium sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-tag px-1.5 text-[11px] font-bold text-foreground">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="rounded-full p-2 transition-base hover:bg-secondary lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4 md:hidden" role="search">
            {searchInput}
          </form>
          <nav className="flex flex-col" aria-label="Principal">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border-b border-border py-3 font-display text-2xl font-bold uppercase"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
