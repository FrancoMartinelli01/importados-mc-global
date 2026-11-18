import { ShieldCheck, MessageSquareHeart, TrendingUp, Sparkles, Truck } from 'lucide-react';

const items = [
  { icon: ShieldCheck, label: 'Productos originales', text: 'Adquiridos a través de proveedores y retailers internacionales.' },
  { icon: MessageSquareHeart, label: 'Atención personalizada', text: 'Te ayudamos a elegir por WhatsApp.' },
  { icon: TrendingUp, label: 'Productos en tendencia', text: 'Lo más buscado en Estados Unidos.' },
  { icon: Sparkles, label: 'Selección premium', text: 'Marcas reconocidas internacionalmente.' },
  { icon: Truck, label: 'Envíos a todo el país', text: 'Te lo mandamos a cualquier punto de Argentina.' },
];

export default function WhyChooseUs() {
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h2 className="mb-10 font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">¿Por qué elegirnos?</h2>
        <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ icon: Icon, label, text }) => (
            <li key={label} className="border-t-2 border-foreground pt-5">
              <Icon className="h-6 w-6" strokeWidth={2} />
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase leading-none">{label}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
