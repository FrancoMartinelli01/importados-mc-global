import { ShoppingBag, Truck, Archive } from 'lucide-react';

const services = [
  {
    title: 'Personal shopper',
    icon: ShoppingBag,
    text: 'Te ayudamos a encontrar productos exclusivos de Estados Unidos, los compramos por vos en retailers internacionales y te los llevamos a tu casa.',
    url: 'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20usar%20el%20servicio%20de%20Personal%20Shopper.%20Les%20comparto%20el%20producto%20que%20estoy%20buscando.',
    cta: 'Pedir un producto',
  },
  {
    title: 'Importación y entrega en Argentina',
    icon: Truck,
    text: 'Comprás online en cualquier tienda de Estados Unidos y nosotros nos encargamos de traerlo hasta tu casa.',
    url: 'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20usar%20el%20servicio%20de%20env%C3%ADos%20desde%20Estados%20Unidos%20a%20Argentina.',
    cta: 'Consultar un envío',
  },
  {
    title: 'Recepción y armado de pedidos',
    icon: Archive,
    text: 'Recibimos y armamos tu pedido en Miami, y lo guardamos a muy bajo costo hasta que lo necesites.',
    url: 'https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quiero%20consultar%20precios%20del%20servicio%20de%20recepci%C3%B3n%20y%20armado%20de%20pedidos%20en%20Miami.',
    cta: 'Ver precios',
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] md:text-6xl">
            Si no está en el catálogo, te lo traemos igual
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Si no tenés medios de pago internacionales, nosotros podemos hacer el pago por vos.
          </p>
        </div>

        <ul className="border-b border-border">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="grid gap-4 border-t border-border py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tag">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-3xl font-extrabold uppercase leading-none">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] text-muted-foreground">{s.text}</p>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-self-start rounded-full border border-foreground/25 px-5 text-sm font-semibold transition-base hover:border-foreground hover:bg-foreground hover:text-background sm:justify-self-end"
                >
                  {s.cta}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
