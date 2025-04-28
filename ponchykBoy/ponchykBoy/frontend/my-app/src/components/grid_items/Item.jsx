import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useOutletContext } from 'react-router-dom';
import ModalDetailInfo from './ModalDetailInfo';
import './Item.css';

function Item({ item }) {
  const [show, setShow] = useState(false);
  const { refreshCart } = useOutletContext(); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const addToCart = async (count) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cart/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          product_id: item.id,   
          number: count,
          is_update_num: false
        }),
      });
    
      if (response.ok) {
        console.log('Item added to cart');
        refreshCart();
      } else {
        const errorData = await response.json();
        console.error('Failed to add item to cart:', errorData);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  return (
    <>
      <Card>
        <Card.Img variant="top" src={item.image} alt='item_img' width="300" height="300" />
        <Card.Body onClick={handleShow} style={{ cursor: 'pointer' }}>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description.slice(0, 100)}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between align-items-center">
            <span>${item.cost}</span>
            <Button variant="primary" onClick={() => addToCart(1) } >Add to Cart</Button>
          </div>
        </Card.Footer>
      </Card>

      <ModalDetailInfo
        show={show}
        onHide={handleClose}
        iteminfo={item}
        addToCartModal ={addToCart}
      />
    </>
  );
}

export default Item;
