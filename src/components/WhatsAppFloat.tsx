import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quisiera%20hacer%20una%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg hover:bg-green-600 transition-base"
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
      <span className="hidden text-sm font-medium sm:inline">
        ¿Necesitás ayuda para elegir? Escribinos por WhatsApp 💬
      </span>
    </a>
  );
}
