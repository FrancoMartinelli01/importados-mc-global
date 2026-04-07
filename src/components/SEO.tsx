import { useEffect } from 'react';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const DEFAULTS = {
  title: 'Importados MC — Tecnología y moda directa desde USA',
  description: 'Comprá tecnología, indumentaria y accesorios importados directamente desde Estados Unidos. Envíos a toda Argentina. Personal Shopper y Courier.',
  image: '/logo.png',
  url: 'https://importadosmc.com.ar',
};

export default function SEO({ title, description, image, url }: SEOProps) {
  const t = title || DEFAULTS.title;
  const d = description || DEFAULTS.description;
  const img = image || DEFAULTS.image;
  const u = url || DEFAULTS.url;

  useEffect(() => {
    document.title = t;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', d);
    setMeta('property', 'og:title', t);
    setMeta('property', 'og:description', d);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:url', u);
    setMeta('name', 'twitter:title', t);
    setMeta('name', 'twitter:description', d);
    setMeta('name', 'twitter:image', img);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', u);
  }, [t, d, img, u]);

  return null;
}
