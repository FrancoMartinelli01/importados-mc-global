import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function Envios() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SEO title="Envíos | Importados MC" description="Información sobre envíos desde Estados Unidos a toda Argentina." />
      <h1 className="text-3xl font-bold text-foreground mb-4">Envíos</h1>
      <p className="text-muted-foreground mb-4">Realizamos envíos a todo el país. Una vez confirmado el pago, tu pedido se despacha desde nuestra oficina en Miami hacia Argentina.</p>
      <p className="text-muted-foreground mb-4">El tiempo estimado de entrega es de 10 a 20 días hábiles, dependiendo de la ubicación y el tipo de producto.</p>
      <p className="text-muted-foreground mb-8">Para consultas sobre el estado de tu envío, contactanos por WhatsApp.</p>
      <Link to="/"><Button>Volver al inicio</Button></Link>
    </div>
  );
}
