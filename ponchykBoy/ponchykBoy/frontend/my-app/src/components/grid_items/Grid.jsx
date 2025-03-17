import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from '../loading_spiner/loading_spiner'
import Item from './Item';  
import Filter from '../filter/Filter'
import "./Grid.css"

function GridItems() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch('http://127.0.0.1:8000/product/')
    // fetch('https://fakestoreapi.com/products')

      .then(response => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <Spinner />; 
  }

  return (
    <>
      <Filter iteminfo={items} className="filter" />
      <div style={{ marginTop: '100px' }} className="table">
        <Row xs={1} md={4} className="g-4">
          {items.map((item) => (
            <Col key={item.id}>
              <Item item={item} />
            </Col>
          ))}
        </Row>
      </div>
  </>
  );
}

export default GridItems;
