import React from 'react'
import './index.css'
import Topbar from './components/TopBar'
import Products from './pages/Products'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import ProductPage from './pages/ProductPage'
import Users from './pages/Users'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Categories from './pages/Categories'



const App = () => {

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <Topbar/>
      <div className='container' >
      <Switch>
         <Route  exact path='/' component={Landing} />
         <Route  path='/home' component={HomePage} />
         <Route  path='/products/:id' component={Products} />
         <Route  path='/categories' component={Categories} />
         <Route  path='/login' component={LoginPage} />
         <Route  path='/signup' component={SignUpPage }/>
         <Route  path='/:email' component={UserPage} />
         <Route  path='/product/:id' component={ProductPage} />
         <Route
                path="/"
                exact
                component={() => (
                  <Landing message="User Logged Out Successfully." />
                )}
              />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
