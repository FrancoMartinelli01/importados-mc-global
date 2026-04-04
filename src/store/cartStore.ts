import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export type CartItem = {
  product: Product;
  qty: number;
  selectedSize?: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, qty?: number, selectedSize?: string) => void;
  removeItem: (productId: string, selectedSize?: string) => void;
  updateQty: (productId: string, qty: number, selectedSize?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1, selectedSize) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.selectedSize === selectedSize
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id && i.selectedSize === selectedSize
                ? { ...i, qty: i.qty + qty }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, qty, selectedSize }] });
        }
      },
      removeItem: (productId, selectedSize) => {
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.selectedSize === selectedSize)
          ),
        });
      },
      updateQty: (productId, qty, selectedSize) => {
        if (qty <= 0) {
          get().removeItem(productId, selectedSize);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.selectedSize === selectedSize
              ? { ...i, qty }
              : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    }),
    { name: 'importados-mc-cart' }
  )
);
