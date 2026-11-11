import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quisiera%20hacer%20una%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-base hover:pr-5"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">
        ¿Consultas?
      </span>
    </a>
  );
}
