import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, RefreshCw, Minus, Plus, ChevronRight, MessageCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import { PRODUCTS, formatPrice, getDiscountPercent, getBrand, getShortName } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import SEO from '@/components/SEO';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import ShippingBox from '@/components/product/ShippingBox';
import SizeGuide from '@/components/product/SizeGuide';

const TRUST = [
  { icon: ShieldCheck, title: '100% original', text: 'Comprado en retailers de Estados Unidos' },
  { icon: CreditCard, title: 'Mercado Pago', text: 'Pagás con la plata o la tarjeta que tengas ahí' },
  { icon: RefreshCw, title: 'Cambios', text: '30 días si llega con defectos o distinto a lo pedido' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // si queda un solo talle, ya viene elegido
  useEffect(() => {
    setSelectedSize(product?.sizes?.length === 1 ? product.sizes[0] : undefined);
    setQty(1);
    setSizeError(false);
  }, [product]);

  // barra fija en el celular cuando los botones de compra salen de la pantalla
  useEffect(() => {
    const el = buttonsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const brand = getBrand(product);
    const sameCat = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id && p.stock > 0);
    const sameBrand = sameCat.filter((p) => brand && getBrand(p) === brand);
    return [...sameBrand, ...sameCat.filter((p) => !sameBrand.includes(p))].slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (!product) navigate('/catalogo', { replace: true });
  }, [product, navigate]);
  if (!product) return null;

  const brand = getBrand(product);
  const hasDiscount = !!product.originalPrice;
  const outOfStock = product.stock === 0;
  const isTech = product.category === 'Tecnología';
  const optionLabel = isTech ? 'Color' : 'Talle';
  const lastOne = product.sizes?.length === 1;
  const maxQty = Math.max(1, product.stock);
  const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const specs = product.specs.filter((s) => !/^100% original$|^Importado de USA$/i.test(s));

  const needsSize = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      document.getElementById('opciones')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return true;
    }
    return false;
  };

  const handleAdd = () => {
    if (needsSize()) return;
    addItem(product, qty, selectedSize);
    toast.success('Agregado al carrito', { description: `${getShortName(product)}${selectedSize ? ` · ${selectedSize}` : ''}` });
  };

  const handleBuyNow = () => {
    if (needsSize()) return;
    addItem(product, qty, selectedSize);
    navigate('/checkout');
  };

  const waText = `Hola Importados MC! Quiero consultar por: ${product.name}${selectedSize ? ` (${selectedSize})` : ''}`;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:pb-16">
      <SEO
        title={`${product.name} | Importados MC`}
        description={product.description}
        image={product.imageUrl}
        url={`https://importadosmc.com.ar/producto/${product.id}`}
      />

      <nav className="mb-6 flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-sm text-muted-foreground" aria-label="Estás en">
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-foreground">{product.category}</Link>
        {brand && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link to={`/catalogo?marca=${encodeURIComponent(brand.split(' x ')[0])}`} className="hover:text-foreground">{brand}</Link>
          </>
        )}
      </nav>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
        <div className="lg:sticky lg:top-[109px] lg:self-start">
          <ProductGallery images={images} name={product.name} />
        </div>

        <div>
          {brand && <p className="text-[15px] font-semibold text-muted-foreground">{brand}</p>}
          <h1 className="mt-1 font-display text-5xl font-black uppercase leading-[0.9] md:text-6xl">{getShortName(product)}</h1>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
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
          {!outOfStock && product.stock <= 2 && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-tag px-3 py-1 text-sm font-semibold">
              {product.stock === 1 ? 'Queda 1 unidad' : `Quedan ${product.stock} unidades`}
            </p>
          )}

          <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Talle o color */}
          {product.sizes && (
            <div id="opciones" className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-semibold">
                  {optionLabel}
                  {selectedSize && <span className="font-normal text-muted-foreground">: {selectedSize}</span>}
                </p>
                {!isTech && <SizeGuide productName={product.name} size={selectedSize} />}
              </div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={optionLabel}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={selectedSize === s}
                    onClick={() => {
                      setSelectedSize(s);
                      setSizeError(false);
                    }}
                    className={`h-11 min-w-[3rem] rounded-full border px-4 text-sm font-semibold transition-base ${
                      selectedSize === s ? 'border-foreground bg-foreground text-background' : 'border-foreground/20 bg-white hover:border-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {lastOne && !isTech && <p className="mt-2 text-sm text-muted-foreground">Es el único talle que queda.</p>}
              {sizeError && <p className="mt-2 text-sm font-semibold text-destructive">Elegí un {optionLabel.toLowerCase()} para seguir</p>}
            </div>
          )}

          {/* Cantidad + compra */}
          <div ref={buttonsRef} className="mt-7 space-y-3">
            <div className="flex gap-3">
              <div className="flex h-12 items-center rounded-full border border-foreground/20 bg-white">
                <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="Restar uno" className="flex h-12 w-11 items-center justify-center disabled:opacity-30">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-semibold" aria-live="polite">{qty}</span>
                <button onClick={() => setQty(Math.min(maxQty, qty + 1))} disabled={qty >= maxQty} aria-label="Sumar uno" className="flex h-12 w-11 items-center justify-center disabled:opacity-30">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                disabled={outOfStock}
                onClick={handleAdd}
                className="h-12 flex-1 rounded-full bg-foreground text-[15px] font-semibold text-background transition-base hover:bg-accent disabled:bg-muted disabled:text-muted-foreground"
              >
                {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
              </button>
            </div>
            <button
              disabled={outOfStock}
              onClick={handleBuyNow}
              className="h-12 w-full rounded-full border border-foreground/25 bg-white text-[15px] font-semibold transition-base hover:border-foreground disabled:opacity-40"
            >
              Comprar ahora
            </button>
            <a
              href={`https://wa.me/541138086005?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-[#128C4A] hover:bg-[#25D366]/10"
            >
              <MessageCircle className="h-5 w-5" /> Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-6">
            <ShippingBox />
          </div>

          <ul className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 sm:flex-col sm:gap-2">
                <Icon className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          {specs.length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 font-semibold">Detalles</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {specs.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-foreground" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-5xl font-extrabold uppercase leading-none">También te puede gustar</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Barra de compra fija en el celular */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 py-3 transition-transform duration-300 md:hidden ${
          showBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!showBar}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{getShortName(product)}</p>
            <p className="font-display text-2xl font-extrabold leading-none">{formatPrice(product.price)}</p>
          </div>
          <button
            disabled={outOfStock}
            tabIndex={showBar ? 0 : -1}
            onClick={handleAdd}
            className="h-12 shrink-0 rounded-full bg-foreground px-6 text-[15px] font-semibold text-background disabled:bg-muted"
          >
            {outOfStock ? 'Sin stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
