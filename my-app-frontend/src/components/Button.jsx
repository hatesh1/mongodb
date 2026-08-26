import React from 'react'
import './style.css'

const Button = ({ onClick, children, type = 'submit' }) => {
    return (
        <button
            type='submit'
            className='button-component'
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button