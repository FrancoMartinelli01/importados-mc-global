import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

/** Visor a pantalla completa: flechas, teclado, deslizar y zoom tocando la foto. */
function Lightbox({ images, name, start, onClose }: { images: string[]; name: string; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (step: number) => {
      setZoom(false);
      setI((n) => (n + step + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [go, onClose]);

  const moveOrigin = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-[#0E0B14]/95" role="dialog" aria-modal="true" aria-label={`Fotos de ${name}`}>
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm text-white/70">
          {i + 1} de {images.length}
        </span>
        <button ref={closeRef} onClick={onClose} aria-label="Cerrar fotos" className="rounded-full p-2.5 hover:bg-white/10">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className={`relative flex-1 overflow-hidden ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={(e) => {
          moveOrigin(e);
          setZoom((z) => !z);
        }}
        onPointerMove={(e) => zoom && moveOrigin(e)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || zoom) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <img
          src={images[i]}
          alt={`${name}, foto ${i + 1}`}
          className="absolute inset-0 m-auto h-full w-full object-contain transition-transform duration-300 ease-out"
          style={{ transform: zoom ? 'scale(2.2)' : 'none', transformOrigin: origin }}
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 p-4">
          <button onClick={() => go(-1)} aria-label="Foto anterior" className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex max-w-[60vw] gap-2 overflow-x-auto">
            {images.map((src, k) => (
              <button
                key={src}
                onClick={() => {
                  setZoom(false);
                  setI(k);
                }}
                aria-label={`Ver foto ${k + 1}`}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 ${k === i ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Foto siguiente" className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [lens, setLens] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const many = images.length > 1;

  // en el celular las fotos se deslizan con el dedo (scroll nativo)
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== index) setIndex(n);
  };

  const show = (n: number) => {
    setIndex(n);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  };

  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      {/* Miniaturas: abajo en el celular, a la izquierda en la compu */}
      {many && (
        <div className="flex gap-2 overflow-x-auto lg:max-h-[640px] lg:flex-col lg:overflow-y-auto" aria-label="Miniaturas">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => show(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-base sm:h-20 sm:w-20 ${
                i === index ? 'border-foreground' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-md bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              onPointerMove={(e) => {
                if (!fine) return;
                const r = e.currentTarget.getBoundingClientRect();
                setLens(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
              }}
              onPointerLeave={() => setLens(null)}
              aria-label={`Ampliar foto ${i + 1} de ${name}`}
              className="relative aspect-square w-full shrink-0 snap-center overflow-hidden lg:cursor-zoom-in"
            >
              <img
                src={src}
                alt={`${name}, foto ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover transition-transform duration-200 ease-out"
                style={lens && i === index ? { transform: 'scale(1.9)', transformOrigin: lens } : undefined}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-white"
        >
          <Expand className="h-3.5 w-3.5" /> Ver fotos
        </button>

        {many && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
            {images.map((src, i) => (
              <span key={src} className={`h-1.5 rounded-full bg-foreground transition-all ${i === index ? 'w-5' : 'w-1.5 opacity-30'}`} />
            ))}
          </div>
        )}
      </div>

      {open && <Lightbox images={images} name={name} start={index} onClose={() => setOpen(false)} />}
    </div>
  );
}
