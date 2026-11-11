import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function ComoComprar() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SEO title="Cómo Comprar | Importados MC" description="Aprendé cómo comprar productos importados desde USA de forma fácil y segura." />
      <h1 className="text-5xl font-black text-foreground mb-4 uppercase leading-[0.95]">Cómo Comprar</h1>
      <ol className="list-decimal list-inside space-y-3 text-muted-foreground mb-8">
        <li>Explorá nuestro catálogo o pedinos el producto que buscás por WhatsApp.</li>
        <li>Agregá los productos al carrito y completá tus datos de envío.</li>
        <li>Realizá el pago de forma segura a través de Mercado Pago.</li>
        <li>Recibí tu pedido en la puerta de tu casa en cualquier punto de Argentina.</li>
      </ol>
      <Link to="/"><Button>Volver al inicio</Button></Link>
    </div>
  );
}
