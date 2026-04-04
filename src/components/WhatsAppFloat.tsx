import { MessageCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function WhatsAppFloat() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="https://wa.me/541138086005?text=Hola%20Importados%20MC!%20Quisiera%20hacer%20una%20consulta."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-base"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </TooltipTrigger>
      <TooltipContent side="left">Consultar por WhatsApp</TooltipContent>
    </Tooltip>
  );
}
