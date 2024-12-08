import { Product } from "./products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartManager {
  cart: CartItem[];
  addProduct: (product: Product, quantity: number) => void;
  removeProduct: (product: Product) => void;
  updateProductQuantity: (product: Product, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export type { CartItem, CartManager };
