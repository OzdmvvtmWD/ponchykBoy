import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import { Rating } from 'react-simple-star-rating';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './Feedback.css'
import Cookies from 'js-cookie';

function Feedback() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [userId, setUserId] = useState(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

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
                        setEmail(data.email || '');
                        setPhone(data.phone_number || '');
                        setSurname(data.surname || '');
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

    const handleRating = (rate) => {
        setRating(rate);
    };

    const isFormValid = () => {
        return (
            email.trim() !== '' &&
            phone.trim() !== '' &&
            name.trim() !== '' &&
            surname.trim() !== ''
        );
    };

    const sendFeedback = async () => {
        try {
            const headers = {
              'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken')              
              
            };
        
            if (token) {
              const token_auth = JSON.parse(token).auth_token;
              headers['Authorization'] = `Token ${token_auth}`;
            }
            const response = await fetch('http://127.0.0.1:8000/feedbacks/', {
                method: 'POST',
                credentials: 'include',
                headers: headers,

                body: JSON.stringify({
                    email: email,
                    phone_number: phone,
                    name: name,
                    surname: surname,
                    description: description,
                    rating: rating,
                    user: userId
                }),
            });
            if (response.ok) {
                console.log('Feedback sent successfully');
            } else {
                const errorData = await response.json();
                console.error('Failed to send feedback:', errorData);
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    };

    if (!token) {
        return (
            <div className="feedback-login-prompt">
                <h2>To leave your feedback, please Login or Sign Up</h2>
                <div className="feedback-buttons">
                    <Button variant="primary" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/signup')}>
                        Sign Up
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <Form className="feedback-form">
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
                    placeholder="Enter your surname"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <PhoneInput
                    defaultCountry="ua"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Rating onClick={handleRating} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Commentary</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                disabled={!isFormValid()}
                onClick={sendFeedback}
            >
                Submit Feedback
            </Button>
        </Form>
    );
}

export default Feedback;
