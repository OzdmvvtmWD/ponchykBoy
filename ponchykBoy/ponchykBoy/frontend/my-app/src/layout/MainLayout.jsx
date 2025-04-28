import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import FooterBar from '../components/footer/Footer';
import NavBar from '../components/nav_bar/NavBar';

const MainLayout = ({ token, onLogout }) => {
  const [cartItems, setCartItems] = useState([]);

  const refreshCart = () => {
    fetch('http://127.0.0.1:8000/cart/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error('Failed to fetch cart:', err));
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <>
      <NavBar cartItems={cartItems} refreshCart={refreshCart} token={token} onLogout={onLogout} />
      <Outlet context={{ cartItems, refreshCart,token, onLogout }} />
      <FooterBar />
    </>
  );
};

export default MainLayout;
