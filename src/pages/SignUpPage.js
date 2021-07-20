import React, { Component } from 'react';

export class SignUpPage extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '' ,
        password: '',
        passwordRepeat: ''
    }

    onChangeFirstName = (event) => {
       const value = event.target.value ;
       this.setState({firstName: value})
    }

    onChangeLastName = (event) => {
        const value = event.target.value ;
        this.setState({lastName: value})
    }

    onChangeEmail = (event) => {
        const value = event.target.value ;
        this.setState({email: value})
    }

    onChangePassword = (event) => {
        const value = event.target.value ;
        this.setState({password: value})
    }

    onChangePasswordRepeat = (event) => {
        const value = event.target.value ;
        this.setState({passwordRepeat: value})
    }

    onClickSignUp = () =>{
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password

        }
        this.props.actions.postSignUp(user);
    }
    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <div>
                    <input placeholder='Your First Name'
                     value={this.state.firstName}
                     onChange={this.onChangeFirstName} />
                </div>
                <div>
                    <input placeholder='Your Last Name'
                    value={this.state.lastName}
                    onChange={this.onChangeLastName} />
                </div>
                <div>
                    <input placeholder='Email'
                    value={this.state.email}
                    onChange={this.onChangeEmail} />
                </div>
                <div>
                    <input type='password' placeholder='Your Password'
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                </div>
                <div>
                    <input type='password' placeholder='Repeat Your Password'
                    value={this.state.passwordRepeat}
                    onChange={this.onChangePasswordRepeat}/>
                </div>
                <div>
                    <button onClick={this.onClickSignUp}>Sign Up</button>
                </div>
            </div>
        );
    }
}

SignUpPage.defaultProps = {
    actions: {
        postSignUp: () => new Promise ((resolve, reject) => {
            resolve({})
        })
    }
}

export default SignUpPage;
