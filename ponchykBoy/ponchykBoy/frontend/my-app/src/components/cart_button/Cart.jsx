import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import './Cart.css'

function Cart({isOpen}) {
  const [items, setItems] = useState([]);

  return (
    <>
        
        <Container fluid className='cart-bg'>

        </Container>
    </>
  );
}

export default Cart;
