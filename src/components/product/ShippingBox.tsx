import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Package } from 'lucide-react';

// Mismos datos que la página de Envíos
const OPTIONS = [
  { id: 'caba', label: 'CABA', icon: Truck, price: '$6.500', text: 'Envío estándar a domicilio en 48 hs hábiles.' },
  { id: 'gba', label: 'GBA', icon: Truck, price: '$7.500', text: 'GBA Norte y Sur, en 48 hs hábiles. Hay zonas sin mensajería propia: ahí lo mandamos por correo.' },
  { id: 'retiro', label: 'Retiro', icon: MapPin, price: 'Gratis', text: 'Retiro coordinado en Ramos Mejía. Te escribimos para acordar día y horario.' },
  { id: 'interior', label: 'Interior', icon: Package, price: 'En destino', text: 'Por Vía Cargo u otro transporte. Se paga al recibir, según ubicación y tamaño.' },
] as const;

const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** Día de despacho según la hora de Buenos Aires: antes de las 9 hs de un día hábil sale ese mismo día. */
function dispatchDay(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')!.value);
  const hour = Number(parts.find((p) => p.type === 'hour')!.value);
  if (wd >= 1 && wd <= 5 && hour < 9) return 'hoy';
  let d = (wd + 1) % 7;
  while (d === 0 || d === 6) d = (d + 1) % 7;
  return d === (wd + 1) % 7 ? 'mañana' : `el ${DAYS[d]}`;
}

export default function ShippingBox() {
  const [sel, setSel] = useState<(typeof OPTIONS)[number]['id']>('caba');
  const opt = OPTIONS.find((o) => o.id === sel)!;
  const when = useMemo(() => dispatchDay(), []);

  return (
    <div className="rounded-md border border-border bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-semibold">Envío</p>
        <p className="text-sm text-muted-foreground">
          Si comprás ahora, sale <span className="font-semibold text-foreground">{when}</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1 rounded-full bg-secondary p-1" role="radiogroup" aria-label="Zona de envío">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            role="radio"
            aria-checked={sel === o.id}
            onClick={() => setSel(o.id)}
            className={`rounded-full py-1.5 text-sm font-semibold transition-base ${sel === o.id ? 'bg-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-3">
        <opt.icon className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="flex-1 text-sm text-muted-foreground">{opt.text}</p>
        <p className="whitespace-nowrap font-display text-xl font-extrabold leading-none">{opt.price}</p>
      </div>
      <Link to="/envios" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">
        Ver todo sobre envíos
      </Link>
    </div>
  );
}
