import { createContext, useState } from "react";

// Create Context
export const CartContext = createContext();

// Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
