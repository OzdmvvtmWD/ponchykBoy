import React, { useState, useEffect } from 'react';
import { Spinner, ListGroup, Card, Button, Alert, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

function ProfilePage() {
  const token = localStorage.getItem('token');
  const token_auth = JSON.parse(token).auth_token;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);  // State to track selected order
  const [selectedFeedback, setSelectedFeedback] = useState(null); // State to track selected feedback

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch('http://127.0.0.1:8000/auth/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token_auth}`,
          },
        });
        const userData = await userResponse.json();
        setUserData(userData);

        const ordersResponse = await fetch('http://127.0.0.1:8000/orders/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token_auth}`,
          },
        });
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        const feedbacksResponse = await fetch('http://127.0.0.1:8000/feedbacks/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token_auth}`,
          },
        });
        const feedbacksData = await feedbacksResponse.json();
        setFeedbacks(feedbacksData);
      } catch (err) {
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order.id === selectedOrder ? null : order.id); 
  };

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback.id === selectedFeedback ? null : feedback.id); 
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="profile-container">
      {userData && (
        <Card className="profile-card">
          <Card.Header as="h5">User Profile</Card.Header>
          <Card.Body>
            <h3>Welcome, {userData.username}</h3>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.first_name}</p>
            <p>Last Name: {userData.last_name}</p>
          </Card.Body>
        </Card>
      )}

      <Card className="profile-card">
        <Card.Header as="h5">Your Orders</Card.Header>
        <Card.Body>
          {orders.length > 0 ? (
            <ListGroup>
              {orders.map((order) => (
                <ListGroup.Item key={order.id} onClick={() => handleOrderClick(order)}>
                  <strong>Order #{order.id}</strong> - Date: {order.order_date} - Status: {order.is_paid ? 'Paid' : 'Not Paid'}
                  <Collapse in={order.id === selectedOrder}>
                    <div>
                      <p>Order Details:</p>
                      <pre>{JSON.stringify(order, null, 2)}</pre> 
                    </div>
                  </Collapse>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No orders found.</p>
          )}
        </Card.Body>
      </Card>

      <Card className="profile-card">
        <Card.Header as="h5">Your Feedbacks</Card.Header>
        <Card.Body>
          {feedbacks.length > 0 ? (
            <ListGroup>
              {feedbacks.map((feedback) => (
                <ListGroup.Item key={feedback.id} onClick={() => handleFeedbackClick(feedback)}>
                  {feedback.description} - Rating: {feedback.rating}
                  <Collapse in={feedback.id === selectedFeedback}>
                    <div>
                      <p>Feedback Details:</p>
                      <pre>{JSON.stringify(feedback, null, 2)}</pre> 
                    </div>
                  </Collapse>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No feedbacks found.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilePage;
