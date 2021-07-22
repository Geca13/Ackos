import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Products from './pages/HomePage'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import ProductPage from './pages/ProductPage'
import Users from './pages/Users'
import {  Route , Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import * as apiCalls from './api/apiCalls'

const actions = {
  postLogin: apiCalls.signIn,
  postSignUp: apiCalls.signUp
}

function App() {
  return (
    <div className='container' >
      <Navbar/>
      <Switch>
         <Route  exact path='/' component={HomePage} />
         <Route  path='/products' component={Products} />
         <Route  path='/login' component={(props) => <LoginPage {...props} actions={actions} />} />
         <Route  path='/signup' component={(props) => <SignUpPage {...props} actions={actions} />}/>
         <Route  path='/:username' component={UserPage} />
         <Route  path='/:product' component={ProductPage} />
      </Switch>
    </div>
  );
}

export default App;
