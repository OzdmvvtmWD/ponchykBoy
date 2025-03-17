import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import ModalDetailInfo from './ModalDetailInfo';

import './Item.css'

function Item({ item }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    
    <Card onClick={handleShow}>
      <Card.Img variant="top" src={item.image}  width="300" height="300" />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description.slice(0, 100)}
          
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {item.cost}
      <Button >add in cart</Button>

      </Card.Footer>
      
    </Card>

    <ModalDetailInfo 
      show={show} 
      onHide={handleClose} 
      iteminfo = {item}
      />
    </>
  );
}

export default Item;
