import { ShieldCheck, MessageSquareHeart, TrendingUp, Sparkles, Truck } from 'lucide-react';

const items = [
  { icon: ShieldCheck, label: 'Productos originales' },
  { icon: MessageSquareHeart, label: 'Atención personalizada' },
  { icon: TrendingUp, label: 'Productos en tendencia' },
  { icon: Sparkles, label: 'Selección premium' },
  { icon: Truck, label: 'Envíos a todo el país' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-accent/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">¿Por qué elegirnos?</h2>
          <p className="text-muted-foreground">Lo que nos diferencia</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
