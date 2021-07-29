import React from 'react';
import { links ,social, links2} from '../api/links'
import { connect } from 'react-redux'
import {FaBars, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { logoutUser } from '../redux/user/authentication/authActions'
import { getUser } from '../redux/user/authentication/authActions';


const  TopBar = (props) =>  {

    const logout = () => {
        props.logoutUser();
        
    };

    const email = localStorage.getItem('user');


        let links = (
            <ul className='nav navbar-nav ml-auto'>
                <li className='nav-item'>
                   <Link to='/login' className='nav-link'>
                       Login
                   </Link>
                </li>

                <li className='nav-item nav-link'>
                     <Link to='/signup'>
                       Sign Up
                   </Link>
                </li>
            </ul>
            );
            if(localStorage.getItem('jwtToken')!== null ) {
               links = (
                <ul className='nav navbar-nav ml-auto'>
                    <li className='nav-item nav-link' >
                      <Link to={getUser(email)}>

                     
                  hi  {email}
                       </Link>
                     
                  </li> 
                  <li className='nav-item nav-link'
                   onClick={logout}
                   style={{cursor:'pointer'}}>
                   Logout
                  </li> 
                </ul>
               ) 
            }

        return (
            <div className='bg-white shadow-sm mb-2'>
                <div className='container'>
                    <nav className='navbar navbar-light navbar-expand'>
                      {links}
                    </nav>

                </div>

            </div>
        );
    
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      logoutUser: () => dispatch(logoutUser()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TopBar);