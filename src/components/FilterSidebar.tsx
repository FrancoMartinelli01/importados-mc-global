import { X } from 'lucide-react';

const categories = ['Todos', 'Tecnología', 'Indumentaria', 'Accesorios'] as const;

type Props = {
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (r: [number, number]) => void;
  stockOnly: boolean;
  onStockOnlyChange: (v: boolean) => void;
  mobile?: boolean;
  onClose?: () => void;
};

export default function FilterSidebar({
  selectedCategory, onCategoryChange,
  priceRange, onPriceRangeChange,
  stockOnly, onStockOnlyChange,
  mobile, onClose,
}: Props) {
  const content = (
    <div className="space-y-6">
      {mobile && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Filtros</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary transition-base">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Category chips */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Categoría</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-base ${
                selectedCategory === c
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-border'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Precio</h4>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([+e.target.value, priceRange[1]])}
            className="w-full accent-violet-600"
          />
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], +e.target.value])}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${priceRange[0].toLocaleString('es-AR')}</span>
            <span>${priceRange[1].toLocaleString('es-AR')}</span>
          </div>
        </div>
      </div>

      {/* Stock toggle */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={stockOnly}
            onChange={(e) => onStockOnlyChange(e.target.checked)}
            className="h-4 w-4 rounded accent-violet-600"
          />
          <span className="text-sm font-medium">Solo con stock</span>
        </label>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
        <div className="absolute left-0 top-0 h-full w-72 bg-background p-6 shadow-2xl overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return <aside className="w-60 shrink-0">{content}</aside>;
}
