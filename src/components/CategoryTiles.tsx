import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';

const count = (c: string) => PRODUCTS.filter((p) => p.category === c).length;

const tiles = [
  {
    name: 'Indumentaria',
    text: 'Diesel, Hugo, Armani, Michael Kors',
    img: '/Campera-bomber-diesel-1.jpeg',
    pos: 'object-[50%_35%]',
    span: 'md:row-span-2',
  },
  {
    name: 'Tecnología',
    text: 'AirPods, Apple Watch y GoPro',
    img: '/AppleWatch-serie11-42mm-1.jpeg',
    pos: '',
    onTag: true,
  },
  {
    name: 'Accesorios',
    text: 'Zapatillas y lo que vaya entrando',
    img: '/Zapatillas-zara-2.jpeg',
    pos: 'object-center',
  },
];

export default function CategoryTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <h2 className="mb-8 font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">
        Qué traemos
      </h2>
      <div className="grid gap-4 md:h-[640px] md:grid-cols-2 md:grid-rows-2">
        {tiles.map((t) => (
          <Link
            key={t.name}
            to={`/catalogo?categoria=${t.name}`}
            className={`group relative flex min-h-[260px] overflow-hidden rounded-md ${t.onTag ? 'bg-tag' : 'bg-white'} ${t.span ?? ''}`}
          >
            {t.onTag ? (
              <img
                src={t.img}
                alt=""
                loading="lazy"
                className="absolute right-5 top-5 aspect-square h-[46%] rotate-3 rounded-md bg-white object-contain p-3 shadow-[0_14px_30px_-14px_rgba(21,23,28,0.5)] transition-transform duration-500 ease-out group-hover:rotate-0 md:right-8 md:top-8 md:h-[62%]"
              />
            ) : (
              <img
                src={t.img}
                alt=""
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover ${t.pos} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
              />
            )}
            {!t.onTag && <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/0 to-transparent" />}
            <div className={`relative mt-auto flex w-full flex-col items-start gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6 ${t.onTag ? 'text-foreground' : 'text-white'}`}>
              <div>
                <h3 className="font-display text-[2.6rem] font-black uppercase leading-none sm:text-5xl md:text-6xl">{t.name}</h3>
                <p className={`mt-2 text-sm ${t.onTag ? 'text-foreground/75' : 'text-white/85'}`}>{t.text}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${t.onTag ? 'bg-foreground text-background' : 'bg-white text-foreground'}`}>
                {count(t.name)} {count(t.name) === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
