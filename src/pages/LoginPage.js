import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import * as authActions from '../redux/authActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../api/apiCalls';

export class LoginPage extends Component {
/*
    state= {
        email: '' ,
        password:'',
        apiError: undefined,
        pendingApiCall: false
    }

    onChangeEmail = (event) => {
        const value = event.target.value;
        this.setState({email: value, apiError:undefined})
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({password: value , apiError:undefined})
    }

    onClickLogin = () => {
        const body = {
            email: this.state.email,
            password:this.state.password
        };
        this.setState({pendingApiCall:true})
       this.props.actions.postLogin(body)
        .then((response) => {
            
            this.setState({pendingApiCall: false } , () => {
                this.props.history.push('/')
            })
        })
        .catch((error) =>{
            if(error.response) {
                this.setState({
                    apiError: error.response.data.message,
                     pendingApiCall: false
                    })
            }
        });
    }

    */
    constructor() {
        super();
        this.state = {
          email: "",
          password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
      onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
          email: this.state.email,
          password: this.state.password
        };
    
        this.props.login(LoginRequest);
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render() {
        let disableSubmit = false;
        if(this.state.email === '' || this.state.password === ''){
            disableSubmit = true;
        }
        return (
            /*
            <div className='container'>
                <h1 className='text-center'>Login</h1>
                <form onSubmit={this.onSubmit}>
                <div className='col-12 mb-3'>
                  <Input
                   label='Email'
                   placeholder='Your Email'
                   value={this.state.email}
                   onChange={this.onChange}/>
                </div>

                <div className='col-12 mb-3'>
                  <Input
                   label='Password'
                   placeholder='Your Password' 
                   type='password'
                   value={this.state.password}
                   onChange={this.onChange}/>
                </div>
                {
                    this.state.apiError && (
                        <div className='col-12 mb-3'>
                          <div className='alert alert-success'>
                            {this.state.apiError}
                          </div>
                        </div>
                    )
                }
                <div className='text-center'>
                    <ButtonWithProgress 
                    onClick={this.onClickLogin}
                    disabled={disableSubmit || this.state.pendingApiCall}
                    text='Sign In'
                    pendingApiCall={this.state.pendingApiCall}/>

                        
                </div>
                </form>
            </div>
            */

            <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                   onChange={this.onChange}/>
                  
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

LoginPage.defaultProps = {
    actions: {
        postLogin: () =>
         new Promise((resolve, reject) =>
          resolve({}))
    },
    dispatch: () =>{}

}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   security: state.security,
   errors: state.errors
})

export default connect(mapStateToProps, {login}) (LoginPage);