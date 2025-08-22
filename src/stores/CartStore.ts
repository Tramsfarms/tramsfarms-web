import { Product } from "@/@types/AllProducts";
import { create } from "zustand";

interface CartStore {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  updateQuantity: (item: Product, quantity: number) => void;
  removeAll: () => void;
  totalCost: number;
  calculateTotalCost: () => void;
  orderId: number | null;
  setOrderId: (id: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  totalCost: 0,

  calculateTotalCost: () => {
    const cart = get().cart;
    const total = cart.reduce(
      (sum, item) => sum + Number(item.sale_price || 0) * (item.quantity || 1),
      0
    );
    set({ totalCost: total });
  },

  orderId: null,
  setOrderId: (id: number) => {
    set({ orderId: id });
  },

  addToCart: (product: Product) => {
    set((state) => {
      if (!state.cart.some((item) => item.id === product.id)) {
        const updatedCart = [...state.cart, { ...product, quantity: 1 }];
        set({ cart: updatedCart });
        get().calculateTotalCost();
        return { cart: updatedCart };
      }
      return state;
    });
  },

  removeFromCart: (product: Product) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== product.id);
      set({ cart: updatedCart });
      get().calculateTotalCost();
      return { cart: updatedCart };
    });
  },

  updateQuantity: (item, quantity) => {
    set((state) => {
      const updatedCart = state.cart.map((i) =>
        i.id === item.id ? { ...i, quantity } : i
      );

      return { cart: updatedCart };
    });

    get().calculateTotalCost(); // Ensure totalCost updates after setting new cart
  },

  removeAll: () => {
    set({ cart: [], totalCost: 0 });
  },
}));
