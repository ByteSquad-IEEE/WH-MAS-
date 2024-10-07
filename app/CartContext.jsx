// CartContext.js
import React, { createContext, useState, useContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = useCallback(async () => {
    try {
      const cartJSON = await AsyncStorage.getItem("cart");
      if (cartJSON) {
        const cart = JSON.parse(cartJSON);
        setCartItems(cart);
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
