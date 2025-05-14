import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Item from './Item';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Grid.css';

function GridItems() {
  const [filterItem, setFilterItem] = useState('All');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
        filterProducts(data, searchQuery, [min, max], selectedTags);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  };

  const fetchTags = () => {
    let url = 'http://127.0.0.1:8000/tags/';
   

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((error) => {
        console.error('Error fetching tags: ', error);
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
    fetchTags();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category.id);

    if (category === 'All') {
      setFilterItem('All');
      getProducts('All');
      fetchTags();
    } else {
      setFilterItem(category.name);
      getProducts(category);
      fetchTags(); 
    }

    setSelectedTags([]); 
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(products, query, priceRange, selectedTags);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    filterProducts(products, searchQuery, value, selectedTags);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    const newMin = value === '' ? 0 : Math.max(parseInt(value), 0);
    const newRange = [newMin, priceRange[1]];
    setPriceRange(newRange);
    filterProducts(products, searchQuery, newRange, selectedTags);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    const newMax = value === '' ? maxPrice : Math.max(parseInt(value), 0);
    const newRange = [priceRange[0], newMax];
    setPriceRange(newRange);
    filterProducts(products, searchQuery, newRange, selectedTags);
  };

  const handleTagToggle = (tagId, isChecked) => {
    const updatedTags = isChecked
      ? [...selectedTags, tagId]
      : selectedTags.filter(id => id !== tagId);

    setSelectedTags(updatedTags);
    filterProducts(products, searchQuery, priceRange, updatedTags);
  };

  const filterProducts = (allProducts, query, priceRange, tagFilter) => {
  const filtered = allProducts.filter(product => {
    const inPrice = product.cost >= priceRange[0] && product.cost <= priceRange[1];
    const nameMatch = product.name.toLowerCase().includes(query.toLowerCase());

    const matchesTag =
      tagFilter.length === 0 ||
      (product.tags && product.tags.some(tag => tagFilter.includes(tag.id)));

    return inPrice && nameMatch && matchesTag;
  });

  setFilteredProducts(filtered);
};

  return (
    <div className="page-container-grid-re">
      <div className="filter-cat-bg">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              id="myInput"
              type="text"
              placeholder="Input product's name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>

        <Form.Label>Categories</Form.Label>
        <div className="scrollable-filter-section">
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
        </div>

        <hr />

        {tags.length > 0 && (
          <>
            <Form.Label>Type</Form.Label>
            <div className="scrollable-filter-section form-type-section">
              <ListGroup>
                {tags.map((tag) => (
                  <ListGroup.Item key={tag.id}>
                    <Form.Check
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      label={tag.name}
                      className="mb-3"
                      aria-label={`option-${tag.id}`}
                      onChange={(e) => handleTagToggle(tag.id, e.target.checked)}
                      checked={selectedTags.includes(tag.id)}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </>
        )}

        <hr />

        <Slider
          range
          min={minPrice}
          max={maxPrice}
          step={1}
          value={priceRange}
          onChange={handlePriceRangeChange}
          tipFormatter={(value) => `$${value}`}
        />

        <div className="price-range">
          <span>Price Range: </span>
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            min={minPrice}
            max={priceRange[1]}
          />
          -
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            min={priceRange[0]}
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
