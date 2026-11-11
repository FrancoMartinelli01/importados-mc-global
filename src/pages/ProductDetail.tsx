import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, Star, Minus, Plus, ShoppingCart, ChevronRight, MessageCircle } from 'lucide-react';
import { PRODUCTS, formatPrice, getDiscountPercent, getBrand, getShortName } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import SEO from '@/components/SEO';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';

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

  const relatedProducts = useMemo(() => {
    const sameCat = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
    const brandWord = product.name.split(' ').find((w) => w.length > 3);
    const sameBrand = brandWord ? sameCat.filter((p) => p.name.toLowerCase().includes(brandWord.toLowerCase())) : [];
    const others = sameCat.filter((p) => !sameBrand.includes(p));
    return [...sameBrand, ...others].slice(0, 4);
  }, [product]);

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
      <SEO title={`${product.name} | Importados MC`} description={product.description} image={product.imageUrl} url={`https://importadosmc.com.ar/producto/${product.id}`} />
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
          <ProductGallery
            images={product.images && product.images.length > 0 ? product.images : [product.imageUrl]}
            name={product.name}
          />
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
              {product.category}
            </span>
            {product.badge && (
              <span className="ml-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {product.badge}
              </span>
            )}
          </div>

          <div>
            {getBrand(product) && <p className="mb-1 text-[15px] font-semibold text-muted-foreground">{getBrand(product)}</p>}
            <h1 className="text-5xl font-black uppercase leading-[0.9]">{getShortName(product)}</h1>
          </div>

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
            <span className="font-display text-5xl font-extrabold leading-none">{formatPrice(product.price)}</span>
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
            <h3 className="font-sans mb-3 text-sm font-semibold text-foreground">Especificaciones</h3>
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
              <h3 className="font-sans mb-3 text-sm font-semibold text-foreground">Talle</h3>
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
            <h3 className="font-sans mb-3 text-sm font-semibold text-foreground">Cantidad</h3>
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
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-accent disabled:bg-muted disabled:text-muted-foreground transition-base"
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
            <a
              href={`https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20consultar%20sobre%20el%20producto%3A%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-500 py-3.5 text-sm font-semibold text-green-500 hover:bg-green-500 hover:text-white transition-base"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Cross-selling */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-4xl font-black text-foreground uppercase leading-[0.95]">También te puede interesar</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
