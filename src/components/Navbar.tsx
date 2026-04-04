import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Tecnología', to: '/catalogo?categoria=Tecnología' },
  { label: 'Indumentaria', to: '/catalogo?categoria=Indumentaria' },
  { label: 'Accesorios', to: '/catalogo?categoria=Accesorios' },
];

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Importados MC</span>
        </Link>

        {/* Search - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex mx-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full rounded-full border border-border bg-secondary pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-base"
            />
          </div>
        </form>

        {/* Nav links - desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Cart + mobile menu */}
        <div className="flex items-center gap-3">
          <button onClick={onCartOpen} className="relative p-2 hover:bg-secondary rounded-full transition-base">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 lg:hidden hover:bg-secondary rounded-full transition-base">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-border bg-background px-4 pb-4">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 w-full rounded-full border border-border bg-secondary pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-base"
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
