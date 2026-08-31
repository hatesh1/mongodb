import React, { useRef } from 'react'
import axios from 'axios'
import { baseUrl } from '../core.mjs'
import './style.css'

const Form = ({ getAllPosts }) => {
    const titleRef = useRef(null)
    const descRef = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!titleRef.current.value) {
            alert('title is required!')
            return
        }

        if (!descRef.current.value) {
            alert('description is required!')
            return
        }

        try {
            const resp = await axios.post(`${baseUrl}/api/v1/post`, {
                title: titleRef.current.value,
                description: descRef.current.value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            alert('post created successfully!')
            getAllPosts()
            event.target.reset()

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <h2>Mongodb crud</h2>

            <input type='text'
                placeholder='Enter title'
                className='form-input'
                ref={titleRef} required
            />

            <textarea
                placeholder='Enter description'
                className='form-input'
                ref={descRef} required
            ></textarea>

            <button
                className='form-btn'
                type='submit'
            >Submit</button>
        </form>
    )
}

export default Form