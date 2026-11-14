import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import BrandStrip from '@/components/BrandStrip';
import ProductStory from '@/components/ProductStory';
import ProductCard from '@/components/ProductCard';
import FlightSection from '@/components/FlightSection';
import ServicesSection from '@/components/ServicesSection';
import InstagramBand from '@/components/InstagramBand';
import { PRODUCTS } from '@/data/products';

export default function Home() {
  // Mezcla de tecnología e indumentaria para que la vidriera no quede toda igual
  const inStock = PRODUCTS.filter((p) => p.stock > 0);
  const tech = inStock.filter((p) => p.category === 'Tecnología');
  const rest = inStock.filter((p) => p.category !== 'Tecnología');
  const featured = [tech[1], rest[6], tech[2], rest[11], rest[0], tech[4], rest[18], rest[3]].filter(Boolean);

  return (
    <>
      <SEO title="Importados MC | Productos importados desde USA a Argentina" />
      <Hero />
      <BrandStrip />

      <section className="mx-auto max-w-7xl px-4 pt-16 md:pt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">Recién llegados</h2>
          <Link to="/catalogo" className="shrink-0 pb-1 text-[15px] font-semibold underline decoration-tag decoration-[3px] underline-offset-4 hover:decoration-foreground">
            Ver todo ({PRODUCTS.length})
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <ProductStory
        title="Tecnología original"
        intro="Productos Apple sellados, comprados en Estados Unidos."
        frames={{ dir: '/secuencias/tecnologia', count: 204 }}
        bg="#000"
        dark
        length={300}
        chapters={[
          { productId: 'airpods-pro-3', from: 0, text: 'Cancelación activa de ruido, chip H2 y estuche USB-C.' },
          { productId: 'apple-watch-s11-42', from: 0.8, text: 'Caja de 42 mm con GPS y monitoreo de salud. También hay de 46 mm.' },
        ]}
        cta={{ label: 'Ver tecnología', to: '/catalogo?categoria=Tecnología' }}
      />
      <ProductStory
        title="Diesel, recién llegado"
        intro="Ropa original de la marca, traída de Estados Unidos."
        frames={{ dir: '/secuencias/ropa', count: 95 }}
        bg="#E5F3F8"
        length={240}
        chapters={[
          { productId: 'bomber-diesel', from: 0, text: 'Bomber negra con forro naranja y la etiqueta roja en la manga. Talle XL.' },
          { productId: 'camperon-diesel-batik', from: 0.72, text: 'Camperón oversize con estampa batik y el logo gigante adelante. Talle XL.' },
        ]}
        cta={{ label: 'Ver indumentaria', to: '/catalogo?categoria=Indumentaria' }}
      />
      <FlightSection />
      <ServicesSection />
      <InstagramBand />
    </>
  );
}
