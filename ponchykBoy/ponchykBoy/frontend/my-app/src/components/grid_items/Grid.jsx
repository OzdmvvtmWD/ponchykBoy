import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Item from './Item';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import "./Grid.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function GridItems() {
  const [filterItem, setFilterItem] = useState('All');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const getProducts = (category) => {
    let url = 'http://127.0.0.1:8000/product/';

    if (category !== 'All') {
      url = `http://127.0.0.1:8000/product/category-products/?category=${category.id}`;
    }

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
      .then(response => response.json())
      .then((data) => {
        setProducts(data);
        const min = Math.min(...data.map(product => product.cost));
        const max = Math.max(...data.map(product => product.cost));
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
        filterProducts(data, searchQuery, [min, max]);
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

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setFilterItem('All');
      getProducts('All');
    } else {
      setFilterItem(category.name);
      getProducts(category);
    }
    filterProducts(products, searchQuery, [priceRange[0], priceRange[1]])
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(products, query, priceRange);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    filterProducts(products, searchQuery, value);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
  
    if (value === '') {
      setMinPrice(0);
      setPriceRange([null, priceRange[1]]);
    } else {
      
      setPriceRange([Math.max(parseInt(value), 0), priceRange[1]]);
    }
  
    filterProducts(products, searchQuery, [Math.max(parseInt(value),0), priceRange[1]]);
  };
  
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
  
    if (value === '') {
      setMaxPrice(0);
      setPriceRange([priceRange[0], null]);
    } else {
     
      setPriceRange([priceRange[0], Math.max(parseInt(value), 0)]);
    }
  
    filterProducts(products, searchQuery, [priceRange[0], Math.max(parseInt(value), 0)]);
  };

  const filterProducts = (products, searchQuery, priceRange) => {
    const filtered = products.filter(product => {
      const isInPriceRange = product.cost >= priceRange[0] && product.cost <= priceRange[1];
      const isNameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isInPriceRange && isNameMatch;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="page-container-grid-re">
      <div className='filter-cat-bg'>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control 
              id='myInput' 
              type="text" 
              placeholder="Input product's name..." 
              value={searchQuery} 
              onChange={handleSearchChange}
            />
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
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: 'pointer' }}
            >
              {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Slider
          range
          min={minPrice}
          max={maxPrice}
          step={1}
          value={priceRange}
          onChange={handlePriceRangeChange}
          tipFormatter={value => `$${value}`}
        />
        <div className="price-range">
          <span>Price Range: </span>
          <input 
            type="number" 
            value={priceRange[0]} 
            onChange={handleMinPriceChange} 
            min={minPrice} 
            max={maxPrice} 
          /> - 
          <input 
            type="number" 
            value={priceRange[1]} 
            onChange={handleMaxPriceChange} 
            min={minPrice} 
            max={maxPrice} 
          />
        </div>
      </div>
      
      <div className="table-grid-re">
        <Row xs={1} md={4} className="g-4">
          {filteredProducts.map((item) => (
            <Col key={item.id}>
              <Item item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default GridItems;
