import { Ruler, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

/** Cómo elegir el talle. No inventamos medidas: se piden las exactas de la prenda por WhatsApp. */
export default function SizeGuide({ productName, size }: { productName: string; size?: string }) {
  const msg = `Hola Importados MC! Me pasan las medidas de: ${productName}${size ? ` (talle ${size})` : ''}? Gracias`;
  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
        <Ruler className="h-4 w-4" /> Guía de talles
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-4xl font-black uppercase leading-none">Guía de talles</SheetTitle>
        </SheetHeader>

        <p className="mt-4 text-[15px] text-muted-foreground">
          Las prendas vienen de Estados Unidos y el talle puede variar entre marcas y modelos (no es lo mismo una remera
          entallada que una oversize). La forma más segura de acertar es comparar con una prenda tuya.
        </p>

        {/* dibujo simple de dónde medir */}
        <svg viewBox="0 0 200 170" className="mx-auto mt-6 w-56" aria-hidden="true">
          <path d="M60 20 L85 10 Q100 22 115 10 L140 20 L178 52 L160 74 L140 60 L140 158 L60 158 L60 60 L40 74 L22 52 Z" fill="#EFE9FB" stroke="#17141F" strokeWidth="2" strokeLinejoin="round" />
          <line x1="62" y1="70" x2="138" y2="70" stroke="#7C3AED" strokeWidth="3" />
          <text x="100" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7C3AED">A</text>
          <line x1="150" y1="18" x2="150" y2="158" stroke="#7C3AED" strokeWidth="3" strokeDasharray="5 4" />
          <text x="160" y="96" fontSize="12" fontWeight="700" fill="#7C3AED">B</text>
        </svg>

        <ol className="mt-6 space-y-4 text-[15px]">
          <li>
            <p className="font-semibold">Elegí una prenda tuya que te quede bien</p>
            <p className="text-muted-foreground">Del mismo tipo: remera con remera, buzo con buzo.</p>
          </li>
          <li>
            <p className="font-semibold">A · Ancho: de axila a axila</p>
            <p className="text-muted-foreground">Con la prenda estirada sobre una mesa, de lado a lado justo debajo de las mangas.</p>
          </li>
          <li>
            <p className="font-semibold">B · Largo: del hombro al borde de abajo</p>
            <p className="text-muted-foreground">Desde el punto más alto del hombro, en línea recta.</p>
          </li>
          <li>
            <p className="font-semibold">Pedinos las medidas de esta prenda</p>
            <p className="text-muted-foreground">Te las tomamos y te las pasamos por WhatsApp para que compares antes de comprar.</p>
          </li>
        </ol>

        <a
          href={`https://wa.me/541138086005?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-semibold text-white hover:bg-[#1fb857]"
        >
          <MessageCircle className="h-5 w-5" /> Pedir las medidas por WhatsApp
        </a>
      </SheetContent>
    </Sheet>
  );
}
