import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
import moment from 'moment'
import { baseUrl } from '../core.mjs'
import './style.css'
import Header from '../components/Header'

const Posts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts()
    }, [])

    const getAllPosts = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/post`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setPosts(resp.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const deletePost = async (postId) => {
        if (!postId) {
            alert('post id is required')
            return
        }
        try {
            const resp = await axios.delete(`${baseUrl}/api/v1/post/${postId}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            alert('post deleted successful!')
            getAllPosts()
        } catch (error) {
            console.error(error)
        }
    }

    const editPost = async (postId, title, description) => {
        if (!postId) {
            alert('post id is required')
            return
        }

        const updatedTitle = prompt('Enter updated title', title)
        const updatedDesc = prompt('Enter updated description', description)

        if (!updatedTitle || !updatedDesc) return

        try {
            const resp = await axios.put(`${baseUrl}/api/v1/post/${postId}`, {
                title: updatedTitle,
                description: updatedDesc
            },
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            )
            alert('post updated sucessfull!')
            getAllPosts()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='posts-page-container'>
            <Header />
            <Form getAllPosts={getAllPosts} />

            <div className='posts-list-container'>
                {posts.length ? (
                    posts.map((singlePost) => {
                        return (
                            <div key={singlePost._id} className='post-card'>
                                <span className='post-timestamp'>
                                    {moment(singlePost.createdAt || singlePost.id).fromNow()}
                                </span>
                                <h3 className='post-title'>{singlePost.title}</h3>
                                <p className='post-description'>{singlePost.description}</p>
                                <div className='post-actions'>
                                    <button
                                        className='btn-edit'
                                        onClick={() => editPost(singlePost._id, singlePost.title, singlePost.description)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn-delete'
                                        onClick={() => deletePost(singlePost._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='no-posts-found'>No posts found</div>
                )}
            </div>
        </div>
    )
}

export default Posts