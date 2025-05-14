import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef, use } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdDeleteOutline } from "react-icons/md";
import Image from 'react-bootstrap/Image';

function OrderCart(props) {

    const totalCost = Object.values(props.cartItems).reduce((sum, item) => sum + (parseFloat(item.cost) || 0),0);
    
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
        Object.keys(props.cartItems).forEach(itemId => {
            if (!productDetails[itemId]) { 
            getProduct(itemId);
            }
        });
        }, [props.cartItems]); 

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
        props.refreshCart();
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
        props.refreshCart();
        } else {
        const errorData = await response.json();
        console.error('Failed to delete cart:', errorData);
        }
    } catch (error) {
        console.error('Error delete cart:', error);
    }
    };



return (
    <div className="cart-order-form-wrapper">

        <div className="cart-order">
            <h2 >Review Your Order<MdDeleteOutline style={{marginLeft:" 200px"}} onClick={DELCart} /></h2>
            <div className='card-item'>
            {props.cartItems && Object.keys(props.cartItems).length > 0 ? (
            <ListGroup>
                {Object.entries(props.cartItems).map(([itemId, itemData]) => {
                const product = productDetails[itemId];
                return (
                    
                    <ListGroup.Item key={itemId}>
                    {product ? (
                        <>
                        <Image src={product.image} alt='image_of_item' fluid width="200" height="200" />
                        {product.name}
                        <Button variant="success" onClick={() => UPDTCart(itemId, 1)}>+</Button>
                        <span style={{ margin: '0 10px' }}>{itemData.number}</span>
                        <Button variant="danger" onClick={() => UPDTCart(itemId, -1)}>-</Button>
                        <span style={{ marginLeft: '10px' }}>${itemData.cost}</span>
                        </>
                    ) : (
                        <span>Loading...</span>
                    )}
                    </ListGroup.Item>
                
                );
                })}
                
            </ListGroup>
            ) : ( <p>Cart is empty...</p>)}
            </div>
            <hr></hr>
            <small style={{ marginTop: "17px" }}>
                Total cost: ${totalCost.toFixed(2)}
            </small>
        </div>
    </div>
)}

export default OrderCart;