import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import Validation from './SignupValidation';
import axios from 'axios'

function Signup() {
        const [values, setValues] = useState({
            name: '',
            email: '',
            password: ''

        })
        const navigate = useNavigate();
        const [errors, setErrors] = useState({})
        const handleInput = (event) => {
            setValues(prev => ({...prev, [event.target.name]: event.target.value}))
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            setErrors(Validation(values));
            if(errors.name === "" && errors.email === "" && errors.password === "") {
                axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
            }
        }

    return (
        <div className='d-flex justify-contetnt-center align-items-center bg-primary vh-100'>
            <div action='bg-white p-3 rounded w-25'>
                <h2>Sign up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Enter name' name='name' onChange={handleInput}/>
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>
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
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <p>By continuing, I agree to the terms of use and privacy policy.</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup