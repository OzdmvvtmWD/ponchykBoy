import React, { useState } from 'react';  // Don't forget to import useState
import LoginPage, { Reset, Logo, Footer, Username, Password, Input } from '@react-login-page/base';
import LoginLogo from 'react-login-page/logo-rect';

const css = {
  '--login-bg': '#edeff3',
  '--login-color': '#3b4148',
  '--login-input': '#525D68',
  '--login-input-bg': '#d7dee5',
  '--login-input-hover': '#b6c3d1',
  '--login-input-placeholder': '#8e98a2',
  '--login-btn': '#fff',
  '--login-btn-bg': '#e82f94',
  '--login-btn-focus': '#f0008359',
  '--login-btn-hover': '#ff37a5',
  '--login-btn-active': '#d51c80',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 110px',
  backgroundSize: '100%',
};

  return (
    <LoginPage style={{ height: 640, width: 500, ...css }}>
      <Logo>
        <LoginLogo />
      </Logo>
      <Username
        keyname="username"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ width: 'auto' }}
      />
      <Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ fontSize: 14, display: 'flex', justifyContent: 'space-between', flex: 1 }}>
        <div>Remember Me</div>
        <a href="#" onClick={(event) => event.preventDefault()}>
          Forgot Password
        </a>
      </div>
      <Footer>
        Not a member? <a href="/auth/sign-up/">Sign up now</a>
      </Footer>
    </LoginPage>
  );
};

export default Login;
