import React, { Children, createContext, useState } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const addCart = (item) => {
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const updateCartItems = (item) => {
    setCart(item);
  };
  const calculateTotalPrice = (cart) => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };
  const removeFromCart = (item) => {
    const newCart = cart.filter((i) => i !== item);

    setCart(newCart);
    calculateTotalPrice(newCart);
  };

  const values = {
    cart,
    addCart,
    updateCartItems,
    calculateTotalPrice,
    totalPrice,
    removeFromCart,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartContext;
