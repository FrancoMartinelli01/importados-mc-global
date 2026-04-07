import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Importados MC" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Tecnología, indumentaria y accesorios importados de las mejores marcas del mundo.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full hover:bg-white/10 transition-base"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-full hover:bg-white/10 transition-base"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-full hover:bg-white/10 transition-base"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Productos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/catalogo?categoria=Tecnología" className="hover:text-white transition-base">Tecnología</Link></li>
              <li><Link to="/catalogo?categoria=Indumentaria" className="hover:text-white transition-base">Indumentaria</Link></li>
              <li><Link to="/catalogo?categoria=Accesorios" className="hover:text-white transition-base">Accesorios</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Información</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/sobre-nosotros" className="hover:text-white transition-base">Sobre nosotros</Link></li>
              <li><Link to="/como-comprar" className="hover:text-white transition-base">Cómo comprar</Link></li>
              <li><Link to="/envios" className="hover:text-white transition-base">Envíos</Link></li>
              <li><Link to="/devoluciones" className="hover:text-white transition-base">Devoluciones</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp</li>
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> @importadosmc</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@importadosmc.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Importados MC. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
