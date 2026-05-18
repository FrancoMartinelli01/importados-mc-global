import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function SobreNosotros() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SEO title="Sobre Nosotros | Importados MC" description="Conocé quiénes somos y por qué elegirnos para tus compras desde Estados Unidos." />
      <h1 className="text-3xl font-bold text-foreground mb-4">Sobre Nosotros</h1>
      <p className="text-muted-foreground mb-4">Somos Importados MC, una empresa dedicada a traer lo mejor de Estados Unidos directamente a tu puerta en Argentina. Trabajamos con productos originales y marcas reconocidas internacionalmente de tecnología, indumentaria y accesorios para ofrecerte una selección premium.</p>
      <p className="text-muted-foreground mb-8">Operamos con logística en Estados Unidos para acercarte productos exclusivos en Argentina, con un equipo comprometido en brindarte la mejor experiencia de compra, desde la selección del producto hasta la entrega en tu domicilio.</p>
      <Link to="/"><Button>Volver al inicio</Button></Link>
    </div>
  );
}
