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
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router >
      <Navbar/>
      <Switch>
         <Route  exact path='/' component={HomePage} />
         <Route  path='/products' component={Products} />
         <Route  path='/login' component={LoginPage} />
         <Route  path='/signup' component={SignUpPage} />
         <Route  path='/:username' component={UserPage} />
         <Route  path='/:product' component={ProductPage} />
      </Switch>
    </Router>
  );
}

export default App;
