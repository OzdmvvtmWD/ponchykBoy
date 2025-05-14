import React, { useState, useEffect, useRef, use } from 'react';
import { useOutletContext } from 'react-router-dom';
import OrderCart from './order_components/OrderCart';
import OrderForm from './order_components/OrderForm';

import './Order.css'

function Order() {
  
    const { cartItems, refreshCart } = useOutletContext();
   
    useEffect(() => {
        refreshCart();
      }, []);

  return (
    <div className="cart-order-form-wrapper">
    <OrderCart 
      refreshCart={refreshCart} 
      cartItems={cartItems} 
    />
    <OrderForm 
    refreshCart={refreshCart} 
    cartItems={cartItems} 

    />
  </div>
  );
}

  
    export default Order;