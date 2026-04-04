import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { Product, formatPrice, getDiscountPercent } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

const badgeColors: Record<string, string> = {
  Nuevo: 'bg-foreground text-background',
  Importado: 'bg-primary text-primary-foreground',
  Oferta: 'bg-destructive text-destructive-foreground',
  'Stock limitado': 'bg-amber-500 text-white',
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const hasDiscount = !!product.originalPrice;
  const outOfStock = product.stock === 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-base">
      {/* Image */}
      <Link to={`/producto/${product.id}`} className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-base"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColors[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
            -{getDiscountPercent(product.price, product.originalPrice!)}%
          </span>
        )}
        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 text-lg font-bold text-background">
            Sin stock
          </div>
        )}
        {/* Eye icon on hover */}
        <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-base">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow">
            <Eye className="h-4 w-4 text-foreground" />
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {product.category}
        </span>
        <h3 className="mt-1 text-sm font-bold text-foreground line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-border'}`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          disabled={outOfStock}
          onClick={() => addItem(product)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-violet-700 disabled:bg-muted disabled:text-muted-foreground transition-base"
        >
          <ShoppingCart className="h-4 w-4" />
          {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}
