import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavBar.css"
import { ImCart } from "react-icons/im";
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from 'react-bootstrap/ListGroup';

function NavBar() {
  const [showCart, setShowCart] = useState(false); 
 
  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Image className='logo-image' src="public/assets/strawberry.png" rounded fluid />

        <Navbar.Text className = "brand-name" >React-Bootstrap</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" navbarScroll>
          </Nav>
          <Nav placement="end">
          <ImCart className={`cart ${showCart && 'cart-active'}`} onClick={() => setShowCart(!showCart)}  />
          {showCart && (
            <div className='cart-open'> 
            <CloseButton onClick={() => setShowCart(!showCart)}  />
            Cart is empty...

            </div>
          )}
          <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Menu</Nav.Link>
            <Nav>
            <NavDropdown title="Login" id="basic-nav-dropdown" className='drop-down-log'>
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
              <NavDropdown.Item href="#action/3.2">
                login
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  href="#action/3.4">
                logout
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;