import { ShoppingBag, Truck, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'Personal Shopper',
    icon: ShoppingBag,
    steps: [
      'Te ayudamos a encontrar productos exclusivos de USA',
      'Lo compramos por vos en retailers internacionales',
      'Te lo llevamos a la puerta de tu casa',
    ],
    url: 'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20usar%20el%20servicio%20de%20Personal%20Shopper.%20Les%20comparto%20el%20producto%20que%20estoy%20buscando.',
    cta: 'Empezar ahora',
  },
  {
    title: 'Importación y entrega en Argentina',
    icon: Truck,
    steps: [
      'Comprá online en cualquier tienda de USA',
      'Enviá a nuestra dirección en Miami',
      'Recibí tu compra en cualquier punto de Argentina',
    ],
    url: 'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20usar%20el%20servicio%20de%20env%C3%ADos%20desde%20Estados%20Unidos%20a%20Argentina.',
    cta: 'Empezar ahora',
  },
  {
    title: 'Recepción y armado de pedidos',
    icon: Archive,
    steps: [
      'Comprá online en cualquier tienda de USA',
      'Recibimos y armamos tu pedido en Miami',
      'Lo guardamos por un muy bajo precio hasta que lo necesites',
    ],
    url: 'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20consultar%20precios%20del%20servicio%20de%20recepci%C3%B3n%20y%20armado%20de%20pedidos%20en%20Miami.',
    cta: 'Ver Precios',
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold text-foreground">Nuestros Servicios</h2>
        <p className="text-muted-foreground">Todo lo que necesitás para comprar desde Estados Unidos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">
                {s.title}
              </h3>

              <ol className="mb-6 w-full space-y-0">
                {s.steps.map((step, i) => (
                  <li key={i}>
                    {i > 0 && <div className="my-3 h-px w-full bg-border" />}
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-sm text-foreground">{step}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mb-6 text-center text-xs text-muted-foreground">
                Sin trámites, rápido y 100% seguro.
              </p>

              <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <Button>{s.cta}</Button>
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm italic text-muted-foreground">
        Si no tenés medios de pago internacionales, nosotros{' '}
        <span className="font-bold not-italic text-primary">podemos hacer el pago por vos</span>.
      </p>
    </section>
  );
}
