import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  // en la ficha de producto el celular tiene una barra de compra abajo: el botón sube
  const onProduct = useLocation().pathname.startsWith('/producto');
  return (
    <a
      href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quisiera%20hacer%20una%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className={`fixed right-5 z-50 ${onProduct ? 'bottom-24 md:bottom-5' : 'bottom-5'} flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-4 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-base hover:bg-[#1fb857] sm:pr-5`}
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">¿Necesitás ayuda para elegir? Escribinos</span>
    </a>
  );
}
