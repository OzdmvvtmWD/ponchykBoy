import React, { useState } from 'react'; 
import LoginPage, { Logo, Footer, Username, Password } from '@react-login-page/base';
import LoginLogo from 'react-login-page/logo-rect';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const css = {
  '--login-bg': 'transparent',
  '--login-color': '#333',
  '--login-input': '#333',
  '--login-input-bg': '#f9f9f9',
  '--login-input-hover': '#e8ebf0',
  '--login-input-placeholder': '#aaa',
  '--login-btn': '#fff',
  '--login-btn-bg': '#007bff',
  '--login-btn-focus': '#007bff55',
  '--login-btn-hover': '#006ae6',
  '--login-btn-active': '#0059cc',
  padding: '2.5rem',
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
};

async function LoginUser(email, password) {
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Vary': 'Accept',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }

    return data;

  } catch (error) {
    console.error('Login error:', error.message);
    return { error: error.message };
  }
}

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await LoginUser(userName, password);

    if (result.error) {
      setError(result.error); 
    } else {
      setToken(result); 
      navigate('/');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom right, #e8f0ff, #ffffff)',
    }}>
      <form onSubmit={handleSubmit}>
        <LoginPage style={{ width: 450, ...css }}>
          <Logo>
            <LoginLogo />
          </Logo>

          {error && (
            <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <Username
            keyname="username"
            placeholder="Email" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            style={{ width: '100%' }}
          />

          <Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div style={{
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            color: '#555',
          }}>
            {/* <div>
              <input type="checkbox" /> Remember Me
            </div> */}
            {/* <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: '#007bff' }}>
              Forgot Password?
            </a> */}
          </div>

          <Footer>
            Not a member? <a href="/sign-up/" style={{ color: '#007bff' }}>Sign up now</a>
          </Footer>

          <Button href='/' variant="secondary">Back</Button>
        </LoginPage>
      </form>
    </div>
  );
};

export default Login;
