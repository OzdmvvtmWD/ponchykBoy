
import {Routes,Route,BrowserRouter } from 'react-router-dom'
import React, { useState } from 'react'; 

import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layout/MainLayout';
import Grid from './components/grid_items/Grid'
import LoginForm from './components/login/Login'
import SignUpForm from './components/sign-up/SignUp'
import Order from  './components/order/Order'
import ActivateAccount from './components/activate_account/ActivateAccount';
import useToken from './TokenHook';
import Home from './components/home/Home';
import Feedback from './components/feedback/Feedback';
import Profile from './components/profile/Profile';

function App() {
  const { token, setToken, removeToken } = useToken();
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout  />}>
          <Route index element={<Grid />} />
        </Route>
        <Route path='/order' element={<MainLayout />}>
          <Route index element={<Order />} />
        </Route>
        <Route path="/home" element={<MainLayout />}>
        <Route  index element={<Home />} />
        </Route>
        <Route path="/feedback" element={<MainLayout  />}>
        <Route  index element={<Feedback />} />
        </Route>
        <Route path="/profile" element={<MainLayout  />}>
        <Route  index element={<Profile />} />
        </Route>

          <Route path='/login/' element={<LoginForm setToken={setToken} />} />
          <Route path='/sign-up/' element={<SignUpForm />} />
          <Route path="activation-success/:uid/:token" element={<ActivateAccount />} />


        
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
