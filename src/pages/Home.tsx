import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import { PRODUCTS } from '@/data/products';

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.stock > 0).slice(0, 4);

  return (
    <>
      <SEO title="Importados MC | Productos importados desde USA a Argentina" />
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-2 text-3xl font-bold text-foreground">Destacados</h2>
        <p className="mb-8 text-muted-foreground">Los productos más buscados del momento</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <ServicesSection />
    </>
  );
}
