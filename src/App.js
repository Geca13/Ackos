import React from 'react'
import './index.css'
import Topbar from './components/TopBar'
import Products from './pages/HomePage'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import ProductPage from './pages/ProductPage'
import Users from './pages/Users'
import {  Route , Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'



function App() {
  return (
    <div className='container' >
      <Topbar/>
      <Switch>
         <Route  exact path='/' component={HomePage} />
         <Route  path='/products' component={Products} />
         <Route  path='/login' component={LoginPage} />
         <Route  path='/signup' component={SignUpPage }/>
         <Route  path='/:id' component={UserPage} />
         <Route  path='/:product' component={ProductPage} />
      </Switch>
    </div>
  );
}

export default App;
