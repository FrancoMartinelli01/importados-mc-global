import { Link } from 'react-router-dom';
import { Truck, Clock, MapPin, Package, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const ZONES = [
  { name: 'CABA', cost: '$6.500' },
  { name: 'GBA Norte', cost: '$7.500' },
  { name: 'GBA Sur', cost: '$7.500' },
];

const NO_COVERAGE = ['Florencio Varela', 'Ezeiza', 'Escobar', 'Laferrere', 'González Catán'];

export default function Envios() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SEO title="Envíos | Importados MC" description="Información sobre envíos en CABA, GBA e interior del país." />

      <header className="mb-10 text-center">
        <h1 className="text-6xl font-black text-foreground uppercase leading-[0.95]">Envíos</h1>
        <p className="mt-3 text-muted-foreground">Hacemos llegar tu pedido en CABA, GBA y todo el país.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Truck className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-lg font-semibold text-foreground">Envío estándar (48hs)</h2>
          </div>
          <ul className="space-y-2 text-sm">
            {ZONES.map((z) => (
              <li key={z.name} className="flex justify-between">
                <span className="text-muted-foreground">{z.name}</span>
                <span className="font-semibold text-foreground">{z.cost}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Compras antes de las 9hs se despachan el mismo día hábil.</p>
        </div>

        <div className="rounded-md border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-lg font-semibold text-foreground">Envío express (en el día)</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Disponible en CABA y GBA cercano. El costo se confirma por WhatsApp según zona y horario.
          </p>
          <a
            href="https://wa.me/5491138086005?text=Hola%20Importados%20MC!%20Quiero%20consultar%20el%20envío%20express%20para%20mi%20pedido."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-base"
          >
            <MessageCircle className="h-4 w-4" /> Consultar express
          </a>
        </div>

        <div className="rounded-md border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-lg font-semibold text-foreground">Retiro en punto</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Retiro coordinado en <span className="font-medium text-foreground">Ramos Mejía</span>, sin costo. Te
            contactamos para coordinar día y horario una vez confirmada la compra.
          </p>
        </div>

        <div className="rounded-md border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Package className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-lg font-semibold text-foreground">Envíos al interior</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Despachamos por <span className="font-medium text-foreground">Vía Cargo</span> u otros transportes a todo el
            país. El costo se abona en destino y se calcula según ubicación y tamaño. Te enviamos comprobante y
            seguimiento.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-6">
        <div className="mb-3 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <h2 className="font-sans text-lg font-semibold text-foreground">Zonas sin cobertura por mensajería</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          En las siguientes zonas no llegamos por mensajería propia. Coordinamos envío por correo:
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {NO_COVERAGE.map((z) => (
            <span key={z} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
              {z}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-md border border-border bg-card p-6">
        <h2 className="font-sans mb-4 text-lg font-semibold text-foreground">Tiempos y horarios</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span><span className="font-medium text-foreground">Antes de las 9:00hs:</span> se despacha el mismo día.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span><span className="font-medium text-foreground">Después de las 9:00hs:</span> se despacha el próximo día hábil.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span><span className="font-medium text-foreground">Estándar CABA/GBA:</span> entrega en 48hs hábiles.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span><span className="font-medium text-foreground">Interior:</span> 3 a 7 días hábiles según destino.</span>
          </li>
        </ul>
      </section>

      <div className="mt-10 flex justify-center">
        <Link to="/catalogo"><Button>Ver catálogo</Button></Link>
      </div>
    </div>
  );
}
