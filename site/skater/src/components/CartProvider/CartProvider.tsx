import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartManager, CartItem } from "../../interfaces/cartManager";
import { Product } from "../../interfaces/products";
import axios from "axios";

const baseUrl = "https://www.thelowerorbit.com:8080/api";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

// Create context
const CartContext = createContext<CartManager | undefined>(undefined);
// CartProvider component
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initialize from localStorage if available
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart updated:", cart);
  }, [cart]);

  const addProduct = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeProduct = (product: Product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== product.id)
    );
  };

  const updateProductQuantity = (product: Product, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === product.id ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    const getCheapestPrice = (product: Product) => {
      if (product.onSale) {
        return product.salePrice;
      }
      return product.price;
    };

    return cart.reduce(
      (total, item) => total + getCheapestPrice(item.product) * item.quantity,
      0
    );
  };

  const refreshCart = async () => {
    console.log("Refreshing cart...");
    try {
      const updatedCart = await Promise.all(
        cart.map(async (item) => {
          try {
            const response = await axios.get(
              `${baseUrl}/product/${item.product.id}`
            );
            console.log(`Fetched product ${item.product.id}:`, response.data);
            return { ...item, product: response.data };
          } catch (error) {
            console.error(
              `CORS or other error for product ${item.product.id}:`,
              error
            );
            return item; // Return the original item if the request fails
          }
        })
      );
      setCart(updatedCart);
    } catch (globalError) {
      console.error("Error during cart refresh:", globalError);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshCart, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart
const useCart = (): CartManager => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
