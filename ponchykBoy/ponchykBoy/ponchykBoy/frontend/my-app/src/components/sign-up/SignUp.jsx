import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PhoneInput } from 'react-international-phone';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import 'react-international-phone/style.css';
import './SignUp.css';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_re: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          phone_number:form.phone,
          re_password: form.password_re,
          username: form.name, 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        console.error(data);
        alert('Error: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <PhoneInput
              defaultCountry="ua"
              value={form.phone}
              onChange={handlePhoneChange}
              id="phone"
              name="phone"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={form.password} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password_re">Repeat Password</label>
            <input type="password" id="password_re" value={form.password_re} onChange={handleChange} />
          </div>
          <button type="submit" >Submit</button>
          <h2 align="center" className="or">OR</h2>
        </form>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
        <Button href='/' className="btn-back">Back</Button>

      </div>
    </div>
  );
}
