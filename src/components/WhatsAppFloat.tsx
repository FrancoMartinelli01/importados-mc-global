import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  // en el home el hero ya tiene su botón de WhatsApp: el flotante aparece al bajar
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  const visible = !onHome || scrolled;

  return (
    <a
      href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quisiera%20hacer%20una%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-4 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-[#1fb857] sm:pr-5 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">¿Necesitás ayuda para elegir? Escribinos</span>
    </a>
  );
}
