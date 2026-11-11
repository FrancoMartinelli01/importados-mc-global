import { Plane } from 'lucide-react';
import { PRODUCTS, getBrand } from '@/data/products';

// Las marcas salen del catálogo, así que se actualizan solas
const brands = Array.from(
  new Set(
    PRODUCTS.map(getBrand)
      .filter(Boolean)
      .map((b) => (b as string).split(' x ')[0]),
  ),
);

export default function BrandStrip() {
  const row = [...brands, ...brands];
  return (
    <div className="overflow-hidden border-b border-border bg-background py-5" aria-label={`Marcas: ${brands.join(', ')}`}>
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((b, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="px-8 font-display text-4xl font-extrabold uppercase text-foreground/85">{b}</span>
                <Plane className="h-4 w-4 rotate-45 text-foreground/30" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
