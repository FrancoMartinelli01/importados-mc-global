import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const columns = [
  {
    title: 'Productos',
    links: [
      { label: 'Tecnología', to: '/catalogo?categoria=Tecnología' },
      { label: 'Indumentaria', to: '/catalogo?categoria=Indumentaria' },
      { label: 'Accesorios', to: '/catalogo?categoria=Accesorios' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Cómo comprar', to: '/como-comprar' },
      { label: 'Envíos', to: '/envios' },
      { label: 'Devoluciones', to: '/devoluciones' },
      { label: 'Sobre nosotros', to: '/sobre-nosotros' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img src="/logo.png" alt="Importados MC" className="h-16 w-auto" />
            <p className="mt-5 max-w-xs text-sm text-background/65">
              Ropa de marca y tecnología original, traída desde Estados Unidos a toda Argentina.
            </p>
            <div className="mt-5 flex gap-2">
              <a href="https://instagram.com/importados.mc_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition-base hover:bg-background hover:text-foreground"><Instagram className="h-4 w-4" /></a>
              <a href="https://www.facebook.com/share/1FTihkWveB/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition-base hover:bg-background hover:text-foreground"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 font-display text-xl font-extrabold uppercase">{c.title}</h4>
              <ul className="space-y-2.5 text-sm text-background/65">
                {c.links.map((l) => (
                  <li key={l.to}><Link to={l.to} className="transition-base hover:text-background">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 font-display text-xl font-extrabold uppercase">Contacto</h4>
            <ul className="space-y-2.5 text-sm text-background/65">
              <li><a href="https://wa.me/5491138086005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-base hover:text-background"><Phone className="h-4 w-4" /> +54 9 11 3808-6005</a></li>
              <li><a href="https://instagram.com/importados.mc_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-base hover:text-background"><Instagram className="h-4 w-4" /> @importados.mc_</a></li>
              <li><a href="mailto:importadosmc.arg@gmail.com" className="flex items-center gap-2 break-all transition-base hover:text-background"><Mail className="h-4 w-4 shrink-0" /> importadosmc.arg@gmail.com</a></li>
            </ul>
          </div>
        </div>

        {/* Wordmark gigante: el SVG lo estira justo al ancho disponible */}
        <svg viewBox="0 0 1000 150" className="mt-16 block w-full select-none" aria-hidden="true">
          <text
            x="0"
            y="138"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-background/[0.08] font-display font-black uppercase"
            style={{ fontSize: 182 }}
          >
            Importados MC
          </text>
        </svg>
        <p className="max-w-3xl pb-6 text-xs leading-relaxed text-background/45">
          Las marcas mencionadas pertenecen a sus respectivos propietarios. MC Importados comercializa productos
          originales adquiridos a través de proveedores y retailers internacionales.
        </p>
        <div className="flex flex-col gap-2 border-t border-background/10 py-6 text-xs text-background/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Importados MC. Todos los derechos reservados.</span>
          <span>Miami → Buenos Aires</span>
        </div>
      </div>
    </footer>
  );
}
