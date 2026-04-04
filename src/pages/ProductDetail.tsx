import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, Star, Minus, Plus, ShoppingCart, ChevronRight, MessageCircle } from 'lucide-react';
import { PRODUCTS, formatPrice, getDiscountPercent } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    navigate('/catalogo');
    return null;
  }

  const hasDiscount = !!product.originalPrice;
  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, qty, selectedSize);
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, qty, selectedSize);
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-base">Inicio</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/catalogo" className="hover:text-foreground transition-base">Catálogo</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Image */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl bg-secondary">
            <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {product.category}
            </span>
            {product.badge && (
              <span className="ml-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reseñas)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</span>
                <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground">
                  -{getDiscountPercent(product.price, product.originalPrice!)}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Specs */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Especificaciones</h3>
            <ul className="space-y-2">
              {product.specs.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Sizes */}
          {product.sizes && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Talle</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-base ${
                      selectedSize === s
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p className="mt-2 text-xs text-destructive">Seleccioná un talle</p>}
            </div>
          )}

          {/* Qty */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Cantidad</h3>
            <div className="inline-flex items-center gap-3 rounded-xl border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-secondary transition-base rounded-l-xl">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-secondary transition-base rounded-r-xl">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              disabled={outOfStock}
              onClick={handleAdd}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-violet-700 disabled:bg-muted disabled:text-muted-foreground transition-base"
            >
              <ShoppingCart className="h-4 w-4" />
              {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
            </button>
            <button
              disabled={outOfStock}
              onClick={handleBuyNow}
              className="w-full rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground transition-base"
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
