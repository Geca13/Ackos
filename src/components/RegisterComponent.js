import React , { Componenet, useState } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import AuthService from '../api/AuthService'

const required = (value) =>{
    if(!value) {
        return (
        <div>
            This field is required
        </div>
    )
  } 
}

const validEmail = (value) =>{
    if(!isEmail(value)) {
         return (
            <div>
            This field is required
        </div>  
         )
    }
}

const inputLenght = (value) =>{
    if(value.length < 2 || value.length > 40) {
        return (
            <div>
                The Firs and last name fields must be between 2 and 40 charachters
            </div>
        )
    }
}

const RegisterComponent = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, se]

    const onChangeFirstName = (e) =>{
        const firstName = e.target.value;
        setFirstName(firstName);
    }

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    }

    const onChangePassword = (e) =>{
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handleRegister = (e) => {
        e.preventDefault();


    }
}