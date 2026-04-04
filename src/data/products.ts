export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Tecnología' | 'Indumentaria' | 'Accesorios';
  imageUrl: string;
  stock: number;
  sizes?: string[];
  specs: string[];
  badge?: 'Nuevo' | 'Importado' | 'Oferta' | 'Stock limitado';
  rating: number;
  reviews: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 'airpods-pro-3',
    name: 'AirPods Pro 3ra Gen',
    description: 'Los AirPods Pro de tercera generación con cancelación activa de ruido mejorada, audio adaptativo y hasta 6 horas de batería. Chip H2 para un sonido envolvente y cristalino.',
    price: 289990,
    category: 'Tecnología',
    imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
    stock: 15,
    specs: ['Cancelación activa de ruido', 'Audio adaptativo', 'Chip H2', 'Resistencia IP54', 'Hasta 6 horas de batería'],
    badge: 'Nuevo',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 'campera-north-face',
    name: 'Campera The North Face Himalayan',
    description: 'Campera acolchada The North Face Himalayan con relleno de plumón 700 fill power. Ideal para temperaturas extremas con capucha ajustable y bolsillos con cierre.',
    price: 184990,
    category: 'Indumentaria',
    imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop',
    stock: 8,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    specs: ['Plumón 700 fill power', 'Capucha ajustable', 'Bolsillos con cierre', 'Resistente al agua', 'Peso ultraliviano'],
    badge: 'Importado',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    description: 'El Apple Watch más resistente y capaz. Pantalla siempre activa de 49mm, GPS de doble frecuencia, hasta 36 horas de batería y resistencia de grado militar.',
    price: 524990,
    originalPrice: 599990,
    category: 'Tecnología',
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop',
    stock: 3,
    specs: ['Pantalla 49mm siempre activa', 'GPS doble frecuencia', 'Chip S9 SiP', '36 horas de batería', 'Titanio grado aeroespacial'],
    badge: 'Stock limitado',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 'nb-1080v13',
    name: 'Zapatillas New Balance 1080v13',
    description: 'Las zapatillas de running premium con tecnología Fresh Foam X para máxima amortiguación. Upper de malla transpirable y suela de goma duradera.',
    price: 129990,
    originalPrice: 159990,
    category: 'Indumentaria',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop',
    stock: 20,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    specs: ['Fresh Foam X', 'Upper de malla', 'Suela de goma', 'Drop 6mm', 'Peso 295g'],
    badge: 'Oferta',
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 'rayban-meta',
    name: 'Lentes Ray-Ban Meta Smart',
    description: 'Los lentes inteligentes de Ray-Ban y Meta con cámara de 12MP, parlantes integrados y asistente de IA. Diseño Wayfarer clásico con tecnología de punta.',
    price: 219990,
    category: 'Accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
    stock: 10,
    specs: ['Cámara 12MP', 'Parlantes integrados', 'Asistente Meta AI', 'Diseño Wayfarer', 'Batería recargable'],
    badge: 'Nuevo',
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro M4 11"',
    description: 'El iPad más potente con chip M4, pantalla Liquid Retina XDR de 11 pulgadas, compatibilidad con Apple Pencil Pro y Magic Keyboard.',
    price: 749990,
    originalPrice: 899990,
    category: 'Tecnología',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop',
    stock: 0,
    specs: ['Chip M4', 'Pantalla Liquid Retina XDR', 'Compatible Apple Pencil Pro', 'Face ID', 'Wi-Fi 6E + 5G'],
    badge: 'Importado',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 'herschel-little-america',
    name: 'Mochila Herschel Little America',
    description: 'La icónica mochila Herschel Little America con compartimento acolchado para laptop de 15", correas de cuero vegano y cierre magnético.',
    price: 89990,
    originalPrice: 109990,
    category: 'Accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    stock: 12,
    specs: ['Compartimento laptop 15"', 'Cuero vegano', 'Cierre magnético', 'Volumen 25L', 'Forro a rayas'],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 'carhartt-remera',
    name: 'Remera Carhartt WIP',
    description: 'Remera clásica Carhartt WIP en algodón orgánico de 230g. Corte regular con logo bordado en el pecho. Hecha en Portugal.',
    price: 44990,
    category: 'Indumentaria',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
    stock: 25,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    specs: ['Algodón orgánico 230g', 'Corte regular', 'Logo bordado', 'Hecha en Portugal', 'Lavable a máquina'],
    badge: 'Importado',
    rating: 4.6,
    reviews: 74,
  },
  {
    id: 'sony-wh1000xm6',
    name: 'Sony WH-1000XM6',
    description: 'Los auriculares over-ear con la mejor cancelación de ruido del mercado. 40 horas de batería, códec LDAC y diseño ultraliviano de 227g.',
    price: 319990,
    originalPrice: 379990,
    category: 'Tecnología',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop',
    stock: 7,
    specs: ['Cancelación de ruido líder', '40 horas de batería', 'Códec LDAC', 'Peso 227g', 'Multipoint Bluetooth'],
    badge: 'Nuevo',
    rating: 4.8,
    reviews: 189,
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

export const getDiscountPercent = (price: number, originalPrice: number) =>
  Math.round(((originalPrice - price) / originalPrice) * 100);
