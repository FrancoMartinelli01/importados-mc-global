import { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/products';
import { useSearchStore } from '@/store/searchStore';

export default function SearchDropdown() {
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  const showDropdown = query.trim().length >= 2;

  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setQuery('');
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuery('');
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showDropdown, setQuery]);

  if (!showDropdown) return null;

  const handleSelect = (id: string) => {
    setQuery('');
    navigate(`/producto/${id}`);
  };

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-popover shadow-lg animate-fade-in overflow-hidden z-50"
    >
      {results.length > 0 ? (
        <ul className="py-1">
          {results.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => handleSelect(p.id)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-secondary transition-colors"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-primary font-semibold">{formatPrice(p.price)}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-5 text-center">
          <p className="text-sm text-muted-foreground">No encontramos productos</p>
          <a
            href={`https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Busqu%C3%A9%20${encodeURIComponent(query)}%20y%20no%20encontr%C3%A9%20resultados.%20%C2%BFLo%20ten%C3%A9s%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-green-500 hover:text-green-400 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
