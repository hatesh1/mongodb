import React from 'react'
import Button from './Button'
import { store } from '../store/states.mjs'
import { Link } from 'react-router-dom'

const Header = () => {
    const { globalLogout, user } = store()

    const logout = () => {
        localStorage.removeItem('token')
        globalLogout()
    }

    return (
        <div className='header-container'>
            <Link to='/profile'>{user.firstname} {user.lastname}</Link>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Header