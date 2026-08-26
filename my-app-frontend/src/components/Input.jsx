import React from 'react'
import './style.css'

const Input = ({ placeholder, type = 'text', onChange, value, label }) => {
    return (
        <div className='input-container'>
            <p>{label}</p>
            <input type={type} placeholder={placeholder}
                value={value} onChange={onChange}
                required
                className='input-component'
            />
        </div>
    )
}

export default Input