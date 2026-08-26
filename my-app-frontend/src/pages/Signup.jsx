import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../core.mjs'
import './style.css'

const Signup = () => {
    const navigate = useNavigate()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        // user validations
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !password || !age) {
            setErrorMessage('all fields are required!')
            return
        }

        if (firstname.trim().length < 3 || firstname.trim().length > 30) {
            setErrorMessage('firstname must be between 3 and 30 characters')
            return
        }

        if (lastname.trim().length < 3 || lastname.trim().length > 30) {
            setErrorMessage('lastname must be between 3 and 30 characters')
            return
        }

        const numAge = Number(age)
        if (isNaN(numAge) || numAge < 18 || numAge > 100) {
            setErrorMessage('age must be a number between 18 and 100')
            return
        }

        if (password.length < 8) {
            setErrorMessage('password must be at least 8 characters long')
            return
        }

        if (password !== repPassword) {
            setErrorMessage('passwords do not match!')
            return
        }

        try {
            // api call
            await axios.post(`${baseUrl}/api/v1/signup`, {
                firstName: firstname.trim(),
                lastName: lastname.trim(),
                age: numAge,
                email: email.trim(),
                password: password,
            })

            alert('signup successful!')
            navigate('/login')

        } catch (error) {
            console.error(error)
            const apiErr = error.response?.data?.errors?.[0] || error.response?.data?.message || 'signup failed!'
            setErrorMessage(apiErr)
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-card">
                <h2>Signup</h2>

                {errorMessage && <div className="error-banner">{errorMessage}</div>}

                <Input
                    placeholder='Enter firstname'
                    label='First Name'
                    value={firstname} onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                    placeholder='Enter lastname'
                    label='Last Name'
                    value={lastname} onChange={(e) => setLastname(e.target.value)}
                />
                <Input
                    placeholder='Enter age'
                    label='Age'
                    type='number'
                    value={age} onChange={(e) => setAge(e.target.value)}
                />
                <Input
                    placeholder='Enter email'
                    label='Email'
                    type='email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder='Enter password'
                    label='Password'
                    type='password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    placeholder='Confirm password'
                    label='Confirm Password'
                    type='password'
                    value={repPassword} onChange={(e) => setRepPassword(e.target.value)}
                />

                <p className="auth-link">
                    Already have an account? <Link to='/login'>Login</Link>
                </p>

                <Button>Signup</Button>
            </form>
        </div>
    )
}

export default Signup