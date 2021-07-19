import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router >
      <Navbar/>
      <Switch>
        
      </Switch>
    </Router>
  );
}

export default App;
