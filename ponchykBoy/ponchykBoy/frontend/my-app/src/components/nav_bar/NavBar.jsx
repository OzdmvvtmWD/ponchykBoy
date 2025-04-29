import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ImCart } from 'react-icons/im';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { MdDeleteOutline } from "react-icons/md";


import "./NavBar.css";

function NavBar({ cartItems, refreshCart }) {
  const [showCart, setShowCart] = useState(false);
  const toggleShowA = () => setShowCart(!showCart);
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null);

  const removeToken = () => {
    localStorage.removeItem('token');
    window.location.reload();  
  };
  const totalItems = Object.values(cartItems).reduce((sum, item) => sum + item.number, 0);
  const totalCost = Object.values(cartItems).reduce(
    (sum, item) => sum + (parseFloat(item.cost) || 0),
    0
  );
  const [productDetails, setProductDetails] = useState({});
  

  const getProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/product/${id}`);
      const data = await response.json();
      setProductDetails(prev => ({ ...prev, [id]: data }));
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    Object.keys(cartItems).forEach(itemId => {
      if (!productDetails[itemId]) { 
        getProduct(itemId);
      }
    });
  }, [cartItems]);  

  const useOutsideClick = (callback) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick, true);
  
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);
  
    return ref;
  };

  const ref = useOutsideClick(() => setShowCart(false));

  const UPDTCart = async (itemId, delta) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cart/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          product_id: itemId,   
          number: delta,
          is_update_num: false
        }),
      });
    
      if (response.ok) {
        console.log('Cart is update');
        refreshCart();
      } else {
        const errorData = await response.json();
        console.error('Failed to update item to cart:', errorData);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const DELCart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cart/', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        console.log('Cart is delete');
        refreshCart();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete cart:', errorData);
      }
    } catch (error) {
      console.error('Error delete cart:', error);
    }
  };

  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Image className='logo-image' src="/assets/strawberry.png" rounded fluid />
        <Navbar.Text className="brand-name">PonchykBoy</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" navbarScroll></Nav>
          <Nav placement="end">
            <ImCart className="cart-nav" onClick={toggleShowA} />
            <Badge className="cart-item-number" bg="success">{totalItems}</Badge>
              <Toast show={showCart} onClose={() => setShowCart(false)} ref={ref}>
              <Toast.Header>
                <strong className="me-auto">Cart</strong>
                <small style={{marginTop : "17px"}}>total cost : {totalCost}$</small>
                <MdDeleteOutline style={{marginLeft : "20px",marginTop : "17px", width : "25px" , height : "25px"}} onClick={DELCart} />
              </Toast.Header>
              <Toast.Body>
                {cartItems && Object.keys(cartItems).length > 0 ? (
                  <>
                    <ListGroup>
                      {Object.entries(cartItems).map(([itemId, itemData]) => {
                        const product = productDetails[itemId]; 
                        return (
                          <ListGroup.Item key={itemId}>
                            {product ? (
                              <>
                                {product.name}
                                <Button onClick={() => UPDTCart(itemId, 1)}>+</Button>
                                {itemData.number}
                                <Button onClick={() => UPDTCart(itemId, -1)}>-</Button>
                                ${itemData.cost}
                              </>
                            ) : (
                              <span>Loading...</span>
                            )}
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                    <Button className='make-order-btn' href='/order'>Make order</Button>
                  </>
                ) : (
                  <p>Cart is empty...</p>
                )}
              </Toast.Body>
            </Toast>
            
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/">Menu</Nav.Link>
            <Nav.Link href="/feedback">Feedback</Nav.Link>
            <>
            <NavDropdown title={token ? 'Profile' : 'Login'} id="basic-nav-dropdown" className="drop-down-log">
            {token ? [
              <NavDropdown.Item key="profile" href="/profile">Profile</NavDropdown.Item>,
              <NavDropdown.Divider key="divider" />,
              <NavDropdown.Item key="logout" onClick={removeToken}>Logout</NavDropdown.Item>
            ] : [
              <NavDropdown.Item key="login" href="/login">Login</NavDropdown.Item>,
              <NavDropdown.Item key="signup" href="/sign-up">Sign Up</NavDropdown.Item>
            ]}
            </NavDropdown>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
