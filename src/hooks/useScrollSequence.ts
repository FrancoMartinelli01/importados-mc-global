import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * Dibuja en un canvas una secuencia de cuadros (webp) según el avance del scroll
 * dentro de `wrapRef`. Los cuadros se empiezan a bajar cuando la sección se acerca
 * a la pantalla, así no pesan en la carga inicial del home.
 */
export function useScrollSequence(
  wrapRef: RefObject<HTMLElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
  dir: string,
  count: number,
) {
  const [progress, setProgress] = useState(0);
  const images = useRef<HTMLImageElement[]>([]);
  const current = useRef(-1);
  const started = useRef(false);

  const src = (i: number) => `${dir}/${String(i + 1).padStart(3, '0')}.webp`;

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // si el cuadro todavía no llegó, uso el cargado más cercano hacia atrás
    let i = index;
    while (i > 0 && !(images.current[i]?.complete && images.current[i].naturalWidth)) i--;
    const img = images.current[i];
    if (!img?.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    // object-fit: contain (el fondo del canvas es el mismo de la sección)
    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    current.current = i;
  };

  // Precarga: primer cuadro enseguida, el resto cuando la sección está cerca
  useEffect(() => {
    const first = new Image();
    first.src = src(0);
    first.onload = () => draw(0);
    images.current[0] = first;

    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        for (let i = 1; i < count; i++) {
          const img = new Image();
          img.decoding = 'async';
          img.src = src(i);
          img.onload = () => {
            if (current.current < i) draw(Math.round(progressRef.current * (count - 1)));
          };
          images.current[i] = img;
        }
      },
      { rootMargin: '150% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir, count]);

  const progressRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;
      setProgress(p);
      draw(Math.round(p * (count - 1)));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return progress;
}
