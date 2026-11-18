import { useEffect, useRef, useState } from 'react';
import { Plane } from 'lucide-react';

const steps = [
  {
    title: 'Lo elegís',
    text: 'Desde el catálogo, o nos mandás por WhatsApp la foto de lo que viste en cualquier tienda de Estados Unidos.',
    img: '/Hugo-redbull-1.jpeg',
    blend: true,
  },
  {
    title: 'Lo compramos por vos',
    text: 'Lo compramos en retailers internacionales. Si no tenés medios de pago internacionales, podemos hacer el pago por vos.',
    img: '/AirPods-3taGen-2.jpeg',
    blend: true,
  },
  {
    title: 'Viaja desde Miami',
    text: 'Recibimos y armamos tu pedido en Miami, y sale rumbo a Argentina.',
    img: '/Campera-bomber-diesel-1.jpeg',
  },
  {
    title: 'Llega a tu casa',
    text: 'Te lo mandamos a cualquier punto del país. Ante cualquier duda, nos escribís por WhatsApp.',
    img: '/Remera-basica-diesel-rojo-1.jpeg',
  },
];

// Arco de la ruta MIA → EZE (viewBox 1000 x 120)
const ROUTE = 'M 40 100 C 300 -10, 700 -10, 960 100';

export default function FlightSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [plane, setPlane] = useState({ x: 40, y: 100, angle: -30 });
  const [length, setLength] = useState(1000);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
      const path = pathRef.current;
      if (path) {
        const L = path.getTotalLength();
        const a = path.getPointAtLength(p * L);
        const b = path.getPointAtLength(Math.min(L, p * L + 1));
        const c = p * L + 1 > L ? path.getPointAtLength(L - 1) : a;
        const angle = (Math.atan2(b.y - c.y, b.x - c.x) * 180) / Math.PI;
        setPlane({ x: a.x, y: a.y, angle: p >= 0.999 ? 30 : angle });
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <section className="bg-foreground text-background">
      {/* Escritorio: la sección queda fija mientras el avión cruza */}
      <div ref={wrapRef} className="relative hidden md:block" style={{ height: `${steps.length * 85 + 100}vh` }}>
        <div className="sticky top-[78px] flex h-[calc(100vh-78px)] flex-col justify-center overflow-hidden py-6">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-6xl font-black uppercase leading-none lg:text-7xl">Así viaja tu pedido</h2>
              <p className="pb-2 text-sm text-background/60">Paso {active + 1} de {steps.length}</p>
            </div>

            {/* Ruta */}
            <div className="relative mt-4">
              <svg viewBox="0 0 1000 120" className="max-h-[16vh] w-full overflow-visible" aria-hidden="true">
                <path d={ROUTE} fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="6 10" />
                <path
                  ref={pathRef}
                  d={ROUTE}
                  fill="none"
                  stroke="hsl(var(--tag))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={length}
                  strokeDashoffset={length * (1 - progress)}
                />
                <circle cx="40" cy="100" r="6" fill="hsl(var(--tag))" />
                <circle cx="960" cy="100" r="6" fill={progress > 0.98 ? 'hsl(var(--tag))' : 'currentColor'} fillOpacity={progress > 0.98 ? 1 : 0.4} />
                <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle + 45})`}>
                  <circle r="22" fill="hsl(var(--tag))" />
                  <g transform="translate(-11 -11)">
                    <Plane width={22} height={22} color="hsl(222 14% 10%)" strokeWidth={2.4} />
                  </g>
                </g>
              </svg>
              <div className="mt-1 flex justify-between font-display text-4xl font-black leading-none">
                <span>
                  MIA <span className="block font-sans text-sm font-normal text-background/60">Miami</span>
                </span>
                <span className="text-right">
                  EZE <span className="block font-sans text-sm font-normal text-background/60">Buenos Aires</span>
                </span>
              </div>
            </div>

            {/* Paso activo */}
            <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-12">
              <ol className="relative">
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className={`grid grid-cols-[4.5rem_1fr] gap-4 border-t border-background/15 py-4 transition-opacity duration-500 ${
                      i === active ? 'opacity-100' : 'opacity-35'
                    }`}
                  >
                    <span className="font-display text-4xl font-black leading-none text-tag">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-3xl font-extrabold uppercase leading-none">{s.title}</h3>
                      <p
                        className={`max-w-lg overflow-hidden text-background/75 transition-all duration-500 ${
                          i === active ? 'mt-2 max-h-24' : 'max-h-0'
                        }`}
                      >
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="relative h-[40vh] w-[30vh] overflow-hidden rounded-md bg-white">
                {steps.map((s, i) => (
                  <img
                    key={s.img}
                    src={s.img}
                    alt=""
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                      s.blend ? 'object-contain p-6' : 'object-cover'
                    } ${i === active ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Celular: pasos apilados */}
      <div className="px-4 py-16 md:hidden">
        <h2 className="font-display text-5xl font-black uppercase leading-none">Así viaja tu pedido</h2>
        <div className="mt-4 flex items-center gap-3 font-display text-3xl font-black">
          MIA <span className="h-px flex-1 border-t-2 border-dashed border-tag" /> <Plane className="h-5 w-5 rotate-45 text-tag" /> EZE
        </div>
        <ol className="mt-8">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-background/15 py-5">
              <span className="font-display text-3xl font-black leading-none text-tag">{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none">{s.title}</h3>
                <p className="mt-2 text-background/75">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
