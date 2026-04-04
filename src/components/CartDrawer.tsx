import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/data/products';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCartStore();
  const navigate = useNavigate();
  const total = totalPrice();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-bold">Tu carrito ({totalItems()})</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary transition-base">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <ShoppingCart className="mb-4 h-16 w-16" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 rounded-xl border border-border p-3">
                  <img src={item.product.imageUrl} alt={item.product.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-semibold">{item.product.name}</p>
                        {item.selectedSize && (
                          <p className="text-xs text-muted-foreground">Talle: {item.selectedSize}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize)}
                        className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-secondary transition-base"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-border">
                        <button
                          onClick={() => updateQty(item.product.id, item.qty - 1, item.selectedSize)}
                          className="p-1.5 hover:bg-secondary transition-base rounded-l-lg"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.qty + 1, item.selectedSize)}
                          className="p-1.5 hover:bg-secondary transition-base rounded-r-lg"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">{formatPrice(item.product.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {total >= 100000 ? '✅ Envío gratis incluido' : 'Envío gratis en compras mayores a $100.000'}
            </p>
            <button
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-violet-700 transition-base"
            >
              Finalizar compra →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
