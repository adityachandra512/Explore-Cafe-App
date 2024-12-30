import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit-card'
  });

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price * item.quantity;
    }, 0);

  const updateBillingInfo = (info) => {
    setBillingInfo(prev => ({ ...prev, ...info }));
  };

  const validateBillingInfo = (billing) => {
    const required = ['fullName', 'email', 'address', 'city', 'postalCode', 'country'];
    const emptyFields = required.filter(field => !billing[field] || billing[field].trim() === '');
    
    if (emptyFields.length > 0) {
      throw new Error(`Please fill in the following fields: ${emptyFields.join(', ')}`);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billing.email)) {
      throw new Error('Please enter a valid email address');
    }

    return true;
  };

  const confirmOrder = (submittedBillingInfo) => {
    // Validate the submitted billing info
    validateBillingInfo(submittedBillingInfo);

    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }

    const newOrder = {
      id: Date.now(),
      items: [...cart],
      billingInfo: submittedBillingInfo,
      totalAmount: getTotalPrice(),
      date: new Date().toISOString(),
      status: 'confirmed'
    };

    setOrders(prev => [...prev, newOrder]);
    setCart([]); // Empty the cart
    setBillingInfo({  // Reset billing info
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      paymentMethod: 'credit-card'
    });
    
    return newOrder;
  };

  const getOrders = () => orders;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        billingInfo,
        updateBillingInfo,
        validateBillingInfo,
        confirmOrder,
        orders,
        getOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}