import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import ModalShopInfo from './ModalShopInfo';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Cookies from 'js-cookie';

function OrderForm(props) {

  
  const token = localStorage.getItem('token')
  const [show, setShow] = useState(false);
  const [adress, setAdress] = useState('Choose restoran');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('now');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [surname, setSurname] = useState('');


  const dateNow = new Date();
  const datePlus15 = addTimeToNow({ minutes: 15 });

  const [selectedDay, setSelectedDay] = useState(dateNow.getDate());
  const [selectedHour, setSelectedHour] = useState(dateNow.getHours());
  const [selectedMinute, setSelectedMinute] = useState(0);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const fiveMinuteInterval = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  function addTimeToNow({ minutes = 0, hours = 0, days = 0 }, returnIso = false) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    date.setHours(date.getHours() + hours);
    date.setDate(date.getDate() + days);
    return returnIso ? date.toISOString() : date;
  }

  function returnTimeISO() {
    const date = new Date();
    date.setFullYear(dateNow.getFullYear());
    date.setMonth(dateNow.getMonth());
    date.setDate(selectedDay);
    date.setHours(selectedHour);
    date.setMinutes(selectedMinute);
    return date.toISOString();
  }

  const getOrderDate = () => {
    return deliveryOption === 'now'
      ? addTimeToNow({ minutes: 15 }, true)
      : returnTimeISO();
  };

  const chooseAdress = (adrss) => {
    setAdress(adrss);
    setShow(false);
  };
  const [userId, setUserId] = useState(null);
  console.log(Cookies.get('csrftoken'))

  useEffect(() => {
    if (token) {
      const token_auth = JSON.parse(token).auth_token;
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token_auth}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
            setName(data.username || ''); 
            setSurname(data.surname || ''); 

            setEmail(data.email || ''); 
            setPhone(data.phone_number || ''); 
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [token]);

  console.log('User ID:', userId);
  console.log('auth_token', token);

  const sendOrder = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken')              

      };
  
      if (token) {
        const token_auth = JSON.parse(token).auth_token;
        headers['Authorization'] = `Token ${token_auth}`;
      }
      const response = await fetch('http://127.0.0.1:8000/orders/', {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({
          shop: adress.id,
          email: email,
          phone_number: phone,
          name: name,
          surname: surname,
          order_date: getOrderDate(),
          is_paid: false,
          user: userId,
          // items: [{}]
        }),
        
      }
    
    );

      if (response.ok) {
        console.log('Order is sent');
        props.refreshCart();
      } else {
        const errorData = await response.json();
        console.error('Failed to send order:', errorData);
      }
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  const dayOptions = [...Array(3)].map((_, i) => {
    const d = new Date();
    d.setDate(dateNow.getDate() + i);
    return {
      value: d.getDate(),
      label: `${d.getDate()} ${monthNames[d.getMonth()]}`
    };
  });

  const isFormValid = () => {
    return (
      adress && adress.id &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      name.trim() !== '' &&
      paymentMethod !== '' &&
      (props.cartItems && Object.keys(props.cartItems).length > 0 )
    );
  };

  return (
    <Form className="cart-order-form" onSubmit={(e) => {
      e.preventDefault();
      sendOrder();
    }}>
      <Form.Group className="mb-3">
        <Form.Label>Choose Address</Form.Label>
        <Form.Select required onClick={() => setShow(true)}>
          <option value={adress.id}>{adress.adress}</option>
        </Form.Select>
      </Form.Group>

      <ModalShopInfo
        show={show}
        onHide={() => setShow(false)}
        chooseAdress={chooseAdress}
      />

      <Form.Group className="mb-3">
        <Form.Label>Delivery Time</Form.Label>
        <Form.Select
          required
          value={deliveryOption}
          onChange={(e) => setDeliveryOption(e.target.value)}
        >
          <option value="now">
            In 15 mins ({datePlus15.getHours()}:{datePlus15.getMinutes().toString().padStart(2, '0')})
          </option>
          <option value="custom">Custom time</option>
        </Form.Select>

        {deliveryOption === 'custom' && (
          <>
            <Form.Select required className="mt-2" onChange={(e) => setSelectedDay(Number(e.target.value))}>
              {dayOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Form.Select>

            <Form.Select required className="mt-2" onChange={(e) => setSelectedHour(Number(e.target.value))}>
              {[...Array(24 - dateNow.getHours())].map((_, i) => {
                const hour = i + 1 + dateNow.getHours();
                return (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}
                  </option>
                );
              })}
            </Form.Select>

            <Form.Select required className="mt-2" onChange={(e) => setSelectedMinute(Number(e.target.value))}>
              {fiveMinuteInterval.map((min) => (
                <option key={min} value={min}>
                  {min.toString().padStart(2, '0')}
                </option>
              ))}
            </Form.Select>
          </>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone number</Form.Label>
        <PhoneInput
          defaultCountry="ua"
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
        <Form.Text className="text-muted">
          We may call you to confirm your order details.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Payment Method</Form.Label>
        <Form.Select required value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">-----------</option>
          <option value="card">Credit Card</option>
          <option value="cash">Cash on Delivery</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isFormValid()}>
        Submit Order
      </Button>
    </Form>
  );
}

export default OrderForm;
