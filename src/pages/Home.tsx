import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import TapeStrip from '@/components/TapeStrip';
import Showcase from '@/components/Showcase';
import { useInView } from '@/hooks/useInView';
import ProductStory from '@/components/ProductStory';
import ProductCard from '@/components/ProductCard';
import FlightSection from '@/components/FlightSection';
import ServicesSection from '@/components/ServicesSection';
import InstagramBand from '@/components/InstagramBand';
import WhyChooseUs from '@/components/WhyChooseUs';
import { PRODUCTS } from '@/data/products';

export default function Home() {
  const deal = useInView<HTMLDivElement>(0.15);
  // Mezcla de tecnología e indumentaria para que la vidriera no quede toda igual
  const inStock = PRODUCTS.filter((p) => p.stock > 0);
  const tech = inStock.filter((p) => p.category === 'Tecnología');
  const rest = inStock.filter((p) => p.category !== 'Tecnología');
  const featured = [tech[1], rest[6], tech[2], rest[11], rest[0], tech[4], rest[18], rest[3]].filter(Boolean);

  return (
    <>
      <SEO title="Importados MC | Productos importados desde USA a Argentina" />
      <Hero />
      <TapeStrip />
      <Showcase />

      <section className="mx-auto max-w-7xl px-4 pt-16 md:pt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">Recién llegados</h2>
          <Link to="/catalogo" className="shrink-0 pb-1 text-[15px] font-semibold underline decoration-tag decoration-[3px] underline-offset-4 hover:decoration-foreground">
            Ver todo ({PRODUCTS.length})
          </Link>
        </div>
        <div ref={deal.ref} className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {featured.map((p, i) => (
            // las tarjetas entran como cartas repartidas sobre la mesa
            <div
              key={p.id}
              className="transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                opacity: deal.inView ? 1 : 0,
                transform: deal.inView ? 'none' : `translateY(56px) rotate(${i % 2 ? 5 : -5}deg)`,
                transitionDelay: `${(i % 4) * 90 + Math.floor(i / 4) * 160}ms`,
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <ProductStory
        title="Tecnología original"
        intro="Productos Apple originales y sellados."
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
        intro="Ropa original de la marca, de retailers de Estados Unidos."
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
      <WhyChooseUs />
      <InstagramBand />
    </>
  );
}
