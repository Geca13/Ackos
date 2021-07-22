import React from 'react';
import { links ,social, links2} from '../api/links'
import { connect } from 'react-redux'
import {FaBars, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

class TopBar extends React.Component {

    onClickLogout =()=>{
     const action = {
         type: 'logout-success'
     }
     this.props.dispatch(action)
    }
    render() {

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
            if(this.props.user.isLoggedIn){
               links = (
                <ul className='nav navbar-nav ml-auto'>
                    <li className='nav-item nav-link' >
                      <Link to={`/${this.props.user.id}`}>
                         My Profile
                     </Link>
                  </li> 
                  <li className='nav-item nav-link'
                   onClick={this.onClickLogout}
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
}

const mapStateToProps =(state)=>{
    return {
    user: state
    }
 }
 
 export default connect(mapStateToProps)(TopBar);