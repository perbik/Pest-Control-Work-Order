import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';


function Login() {
        const [values, setValues] = useState({
            email: '',
            password: ''
        })
        const navigate = useNavigate();
        const [errors, setErrors] = useState({})
        const handleInput = (event) => {
            setValues(prev => ({...prev, [event.target.name]: event.target.value}))
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            setErrors(Validation(values));
            if(errors.email === "" && errors.password === "") {
                axios.post('http://localhost:8081/', values)
                .then(res => {
                    if(res.data === "Success"){
                        navigate('/home')
                    } else {
                        alert("No record existed");
                    }
                })
                .catch(err => console.log(err));
            }
        }

    return (
        <div className='d-flex justify-contetnt-center align-items-center bg-primary vh-100'>
            <div action='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter email' name='email' onChange={handleInput}/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter password' name='password' onChange={handleInput}/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>By continuing, I agree to the terms of use and privacy policy.</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login