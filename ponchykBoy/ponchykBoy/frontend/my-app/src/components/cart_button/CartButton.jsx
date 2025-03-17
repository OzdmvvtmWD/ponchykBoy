import './CartButton.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Cart from './Cart';

function CartButton() {
  const [showCart, setShowCart] = useState(false); 
  const [cartItemsCount, setCartItemsCount] = useState(14); 

  const toggleCart = () => {
    setShowCart(!showCart); 
  };

  return (
    <>
  
    </>
  );
}

export default CartButton;
