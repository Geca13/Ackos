import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { login } from '../redux/user/authentication/authActions'
import { connect } from 'react-redux';



export class LoginPage extends Component {

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
      this.props.login(this.state.email, this.state.password);
      setTimeout(() => {
          if(this.props.auth.isLoggedIn) {
              return this.props.history.push("/");
          } else {
              
              this.setState({"error":"Invalid email and password"});
          }
      }, 500);
    }

    
   

    render() {
        let disableSubmit = false;
        if(this.state.email === '' || this.state.password === ''){
            disableSubmit = true;
        }
        return (
            
            <div className='container'>
                <h1 className='text-center'>Login</h1>
                
                <div className='col-12 mb-3'>
                  <Input
                   label='Email'
                   placeholder='Your Email'
                   value={this.state.email}
                   onChange={this.onChangeEmail}/>
                </div>

                <div className='col-12 mb-3'>
                  <Input
                   label='Password'
                   placeholder='Your Password' 
                   type='password'
                   value={this.state.password}
                   onChange={this.onChangePassword}/>
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

const mapStateToProps = state => {
  return {
      auth:state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);