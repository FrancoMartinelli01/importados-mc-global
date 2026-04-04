import { useState, useMemo, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useSearchStore } from '@/store/searchStore';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';

export default function Catalogo() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const qParam = searchParams.get('q');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'Todos');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [stockOnly, setStockOnly] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  const { query } = useSearchStore();
  const searchTerm = qParam || query;

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'Todos' && p.category !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (stockOnly && p.stock === 0) return false;
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [selectedCategory, priceRange, stockOnly, searchTerm]);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catálogo</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} productos encontrados</p>
        </div>
        <button
          onClick={() => setMobileFilters(true)}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium md:hidden transition-base hover:bg-secondary"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            stockOnly={stockOnly}
            onStockOnlyChange={setStockOnly}
          />
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No se encontraron productos con los filtros seleccionados.</p>
              <div className="mt-6 space-y-2">
                <p className="text-lg font-bold text-foreground">¿No encontrás lo que buscás?</p>
                <p className="text-sm text-muted-foreground">Consultanos y lo conseguimos por vos</p>
                <a
                  href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Estoy%20buscando%20un%20producto%20que%20no%20encuentro%20en%20el%20cat%C3%A1logo.%20%C2%BFPod%C3%A9s%20ayudarme%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-base"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFilters && (
        <FilterSidebar
          mobile
          onClose={() => setMobileFilters(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          stockOnly={stockOnly}
          onStockOnlyChange={setStockOnly}
        />
      )}
    </div>
  );
}
