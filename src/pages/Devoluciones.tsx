import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function Devoluciones() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SEO title="Devoluciones | Importados MC" description="Política de devoluciones y cambios de Importados MC." />
      <h1 className="text-3xl font-bold text-foreground mb-4">Devoluciones</h1>
      <p className="text-muted-foreground mb-4">Si recibís un producto con defectos o distinto al solicitado, podés solicitar un cambio o devolución dentro de los 30 días posteriores a la recepción.</p>
      <p className="text-muted-foreground mb-4">Para iniciar el proceso, contactanos por WhatsApp con tu número de orden y fotos del producto.</p>
      <p className="text-muted-foreground mb-8">Evaluaremos cada caso de forma individual y te brindaremos una solución lo antes posible.</p>
      <Link to="/"><Button>Volver al inicio</Button></Link>
    </div>
  );
}
