import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';

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
        const body = {
            email: this.state.email,
            password:this.state.password
        };
        this.setState({pendingApiCall:true})
        this.props.actions.postSignIn(body)
        .then(response => {
            this.setState({pendingApiCall: false})
        })
        .catch((error) =>{
            if(error.response) {
                this.setState({apiError: error.response.data.message, pendingApiCall: false})
            }
        });
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
                          <div className='alert alert-danger'>
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
    }
}

export default LoginPage;