
import {Routes,Route,BrowserRouter } from 'react-router-dom'

import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layout/MainLayout';
import Grid from './components/grid_items/Grid'
import LoginForm from './components/login/Login'
import SignUpForm from './components/sign-up/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Grid />} />
        </Route>

          <Route path='/auth/login/' element={<LoginForm />} />
          <Route path='/auth/sign-up/' element={<SignUpForm />} />
        
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
