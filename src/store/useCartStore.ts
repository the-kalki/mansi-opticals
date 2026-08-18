import { create } from 'zustand';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
  getEstimatedTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isDrawerOpen: false,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  addItem: (itemData) => {
    const newItem: CartItem = {
      ...itemData,
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };

    set((state) => ({
      items: [...state.items, newItem],
      isDrawerOpen: true,
    }));
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );
  },

  getEstimatedTax: () => {
    // 12% GST on medical eyewear
    return Math.round(get().getSubtotal() * 0.12);
  },

  getTotal: () => {
    return get().getSubtotal() + get().getEstimatedTax();
  },
}));
