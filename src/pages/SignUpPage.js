import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';

export class SignUpPage extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '' ,
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
        errors: {} ,
        passwordRepeatConfirmed: true
    }

    onChangeFirstName = (event) => {
       const value = event.target.value ;
       const errors = { ...this.state.errors}
       delete errors.firstName;
       this.setState({firstName: value, errors});
    }

    onChangeLastName = (event) => {
        const value = event.target.value ;
        const errors = { ...this.state.errors}
        delete errors.lastName;
        this.setState({lastName: value, errors});
    }

    onChangeEmail = (event) => {
        const value = event.target.value ;
        const errors = { ...this.state.errors}
        delete errors.email;
        this.setState({email: value, errors})
    }

    onChangePassword = (event) => {
        const value = event.target.value ;
        const passwordRepeatConfirmed = this.state.passwordRepeat === value;
        const errors = {...this.state.errors}
        delete errors.password;
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Does not match to password'
        this.setState({password: value , passwordRepeatConfirmed, errors})
    }

    onChangePasswordRepeat = (event) => {
        const value = event.target.value ;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = {...this.state.errors}
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Does not match to password'
        this.setState({passwordRepeat: value, passwordRepeatConfirmed, errors})
    }

    onClickSignUp = () =>{
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password

        }
        this.setState({pendingApiCall:true})
        this.props.actions.postSignUp(user).then(response => {
            this.setState({pendingApiCall:false})
        }).catch((apiError)=>{
            let errors = {...this.state.errors}
            if(apiError.response.data && apiError.response.data.validationErrors) {
                errors = {...apiError.response.data.validationErrors}
            }
            this.setState({pendingApiCall:false, errors})
        });
    }
    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Sign Up</h1>
                <div className='col-12 mb-3'>
                     
                    <Input 
                     label='First Name'
                     placeholder='Your First Name'
                     value={this.state.firstName}
                     onChange={this.onChangeFirstName}
                     hasError={this.state.errors.firstName && true}
                     error={this.state.errors.firstName} />
                     
                </div>
                <div div className='col-12 mb-3'>
                <Input 
                    label='Last Name'
                    placeholder='Your Last Name'
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    hasError={this.state.errors.lastName && true}
                     error={this.state.errors.lastName} /> 
                </div>
                <div className='col-12 mb-3'>
                <Input 
                    label='Email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.onChangeEmail} 
                    hasError={this.state.errors.email && true}
                     error={this.state.errors.email} />
                </div>
                <div div className='col-12 mb-3'>
                <Input 
                    label='Password'
                    type='password'
                    placeholder='Your Password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    hasError={this.state.errors.password && true}
                     error={this.state.errors.password} />
                    
                </div>
                <div div className='col-12 mb-3'>
                <Input 
                     label='Repeat Password' 
                     type='password' 
                     placeholder='Repeat Your Password'
                     value={this.state.passwordRepeat}
                     onChange={this.onChangePasswordRepeat}
                     hasError={this.state.errors.passwordRepeat && true}
                     error={this.state.errors.passwordRepeat} />
                </div>
                <div className='text-center '>
                    <ButtonWithProgress 
                     onClick={this.onClickSignUp}
                     disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                     pendingApiCall={this.state.pendingApiCall}
                     text='Sign Up'
                     />
                     
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
