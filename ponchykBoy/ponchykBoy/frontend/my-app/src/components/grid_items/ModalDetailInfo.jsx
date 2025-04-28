import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect, useRef } from 'react';

import "./ModalDetailInfo.css"

function ModalDetailInfo(props) {
  const [count, setCount] = useState(0);
  
  return (
    <Modal
      {...props}
      size="lg"

      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {props.iteminfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={props.iteminfo.image} alt='image_of_item' fluid width="200" height="200" />
        <p>
            {props.iteminfo.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {props.iteminfo.cost}$ 
        <Button onClick={() => setCount(count + 1)} disabled={count >= props.iteminfo.number} >+</Button>
        <Form >
        <Form.Group >
          <Form.Control
            required
            type="number"
            defaultValue={0}
            value={count}
            onChange={
              (e) => {setCount(Number(e.target.value))}
            }
 
          />
        </Form.Group> 
        </Form>
        <Button onClick={() => setCount(count - 1)} disabled={count<= 0} >-</Button>  
        
        <Button onClick={() => {
          props.addToCartModal(count);
          setCount(0);
        }}>add in cart</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default ModalDetailInfo;