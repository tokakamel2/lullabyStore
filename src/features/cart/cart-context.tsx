"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";

import type { Product } from "@/features/products/types";

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = CartState & {
  addProduct: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; product: Product; quantity: number }
  | { type: "update"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const STORAGE_KEY = "lullaby-candle-cart";

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      if (action.product.stock <= 0) {
        return state;
      }

      const existing = state.items.find((item) => item.id === action.product.id);
      const nextQuantity = Math.min((existing?.quantity ?? 0) + action.quantity, action.product.stock);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: Math.max(1, nextQuantity) } : item
          )
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: action.product.id,
            name: action.product.name,
            slug: action.product.slug,
            price: action.product.price,
            image: action.product.images[0] ?? "",
            stock: action.product.stock,
            quantity: Math.max(1, Math.min(action.quantity, action.product.stock))
          }
        ]
      };
    }
    case "update":
      return {
        items: state.items
          .map((item) =>
            item.id === action.id ? { ...item, quantity: Math.max(1, Math.min(action.quantity, item.stock)) } : item
          )
          .filter((item) => item.quantity > 0)
      };
    case "remove":
      return { items: state.items.filter((item) => item.id !== action.id) };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);

    if (savedCart) {
      try {
        dispatch({ type: "hydrate", items: JSON.parse(savedCart) as CartItem[] });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [hydrated, state.items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

    return {
      ...state,
      subtotal,
      itemCount,
      addProduct: (product, quantity = 1) => dispatch({ type: "add", product, quantity }),
      updateQuantity: (id, quantity) => dispatch({ type: "update", id, quantity }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clearCart: () => dispatch({ type: "clear" })
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
