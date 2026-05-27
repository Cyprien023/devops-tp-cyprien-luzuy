import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

export type CartItem = {
    product: Product;
    qty: number;
    size: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (product: Product, size: string) => void;
    removeItem: (productId: number, size: string) => void;
    updateQty: (productId: number, size: string, qty: number) => void;
    total: number;
    count: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: string) => {
        setItems((prev) => {
            const existing = prev.find(
                (i) => i.product.id === product.id && i.size === size
            );
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id && i.size === size
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }
            return [...prev, { product, qty: 1, size }];
        });
    };

    const removeItem = (productId: number, size: string) => {
        setItems((prev) =>
            prev.filter((i) => !(i.product.id === productId && i.size === size))
        );
    };

    const updateQty = (productId: number, size: string, qty: number) => {
        if (qty <= 0) {
            removeItem(productId, size);
            return;
        }
        setItems((prev) =>
            prev.map((i) =>
                i.product.id === productId && i.size === size ? { ...i, qty } : i
            )
        );
    };

    const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const count = items.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}