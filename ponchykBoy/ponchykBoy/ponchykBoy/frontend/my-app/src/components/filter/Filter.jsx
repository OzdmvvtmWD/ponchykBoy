import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import './Filter.css';

function Filter({ iteminfo }) {
  const [filterItem, setFilterItem] = useState('All');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = (categoryName) => {
    let url = 'http://127.0.0.1:8000/products/'; // базовий URL

    if (categoryName !== 'All') {
      url = `http://127.0.0.1:8000/product/category-products/?category=${categoryName}`;
    }

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/categories/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories: ', error);
      });

    getProducts('All'); 
  }, []);

  const handleCategoryClick = (categoryName) => {
    setFilterItem(categoryName);
    getProducts(categoryName);
  };

  return (
    <div className='filter-cat-bg'>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control id='myInput' type="text" placeholder="Input product's name..." />
        </Form.Group>
      </Form>

      <ListGroup>
        <ListGroup.Item
          active={filterItem === 'All'}
          onClick={() => handleCategoryClick('All')}
          style={{ cursor: 'pointer' }}
        >
          All
        </ListGroup.Item>
        {categories.map((category) => (
          <ListGroup.Item
            key={category.id}
            active={filterItem === category.name}
            onClick={() => handleCategoryClick(category.name)}
            style={{ cursor: 'pointer' }}
          >
            {category.name}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form.Label>Range</Form.Label>
      <Form.Range />

      {/* Для прикладу виведемо продукти */}
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id}>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
