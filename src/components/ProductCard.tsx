import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product, formatPrice, getDiscountPercent, getBrand, getShortName } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

const badgeStyles: Record<string, string> = {
  Nuevo: 'bg-tag text-foreground',
  Oferta: 'bg-destructive text-destructive-foreground',
  'Stock limitado': 'bg-foreground text-background',
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const hasDiscount = !!product.originalPrice;
  const outOfStock = product.stock === 0;
  const brand = getBrand(product);
  const isTech = product.category === 'Tecnología';
  const second = product.images?.find((img) => img !== product.imageUrl);
  const fit = isTech ? 'object-contain p-5' : 'object-cover';

  return (
    <article className="group relative flex flex-col">
      <Link
        to={`/producto/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden rounded-md bg-white"
        aria-label={product.name}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full ${fit} transition-opacity duration-300 ${second ? 'group-hover:opacity-0' : ''}`}
        />
        {second && (
          <img
            src={second}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${fit} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          />
        )}
        {product.badge && badgeStyles[product.badge] && (
          <span className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
            -{getDiscountPercent(product.price, product.originalPrice!)}%
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 font-display text-2xl font-black uppercase">
            Sin stock
          </div>
        )}
      </Link>

      <div className="flex flex-1 items-start justify-between gap-3 pt-3">
        <Link to={`/producto/${product.id}`} className="min-w-0">
          {brand && <p className="text-[13px] font-semibold text-muted-foreground">{brand}</p>}
          <h3 className="mt-0.5 font-sans text-[15px] font-medium leading-snug line-clamp-2">{getShortName(product)}</h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold leading-none">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</span>
            )}
          </div>
        </Link>
        <button
          disabled={outOfStock}
          onClick={() => {
            addItem(product);
            toast.success('Agregado al carrito', { description: getShortName(product) });
          }}
          aria-label={`Agregar ${product.name} al carrito`}
          title="Agregar al carrito"
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/20 transition-base hover:border-foreground hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}
