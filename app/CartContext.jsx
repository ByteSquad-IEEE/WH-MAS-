import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [productIds, setProductIds] = useState([]); // Initialize as string "[]"

  const clearCart = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("cart");
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
      setProductIds([]); // Reset product IDs
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }, []);

  const updateCart = useCallback(async () => {
    try {
      const cartJSON = await AsyncStorage.getItem("cart");
      if (cartJSON) {
        const cart = JSON.parse(cartJSON);
        setCartItems(cart);
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
        setCartTotal(
          cart.reduce((total, item) => total + parseInt(item.price), 0)
        );
        // Convert array of IDs to a string
        const ids = cart.map((item) => parseInt(item.id));
        // const idsString = JSON.stringify(ids);
        setProductIds(ids);
      } else {
        setCartItems([]);
        setCartCount(0);
        setCartTotal(0);
        setProductIds([]);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        updateCart,
        cartTotal,
        productIds,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
