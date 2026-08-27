import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { baseUrl } from '../core'
import axios from 'axios'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    // validations
    if (!email || !password) {
      setErrorMessage('Email and password are required!')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long')
      return
    }

    try {
      // call api
      const resp = await axios.post(`${baseUrl}/api/v1/login`, {
        email: email,
        password: password,
      })

      alert('login successful!')
      localStorage.setItem('token', resp.data.data)

    } catch (error) {
      console.error(error)
      const apiErr = error.response?.data?.message || 'invalid email or password'
      setErrorMessage(apiErr)
    }
  }

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit} className='auth-card'>
        <h2>Login</h2>

        {errorMessage && <div className='error-banner'>{errorMessage}</div>}

        <Input
          placeholder='Enter email'
          label='Email'
          type='email'
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Enter password'
          label='Password'
          type='password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className='auth-link'>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </p>

        <Button type='submit'>Login</Button>
      </form>
    </div>
  )
}

export default Login