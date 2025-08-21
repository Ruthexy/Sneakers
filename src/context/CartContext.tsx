import React, { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: string; // product id
  name: string;
  price: number; // unit price
  qty: number;
  thumbnail: string; // small image for cart
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: number; // total qty
  total: number; // total price
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem: CartContextType["addItem"] = (item, qty) => {
    if (qty <= 0) return;
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { count, total };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clear, count, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
