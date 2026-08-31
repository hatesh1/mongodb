import React, { useState } from 'react'
import { store } from '../store/states.mjs'
import { FaPencilAlt } from 'react-icons/fa'
import axios from 'axios'
import { baseUrl } from '../core.mjs'
import Input from '../components/Input'
import Button from '../components/Button'

const Profile = () => {
    const { user, globalLogin } = store()

    const editProfile = async () => {
        const firstname = prompt('enter firstname', user.firstname)
        const lastname = prompt('enter lastname', user.lastname)


        try {
            const resp = await axios.put(`${baseUrl}/api/v1/profile`, {
                firstname,
                lastname
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            globalLogin({
                ...user,
                firstname: firstname,
                lastname: lastname,
            })

        } catch (error) {
            console.error(error)
            alert(error.response.data.message)
        }

    }

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')

    const updatePassword = async () => {

        if (!currentPassword) {
            alert('current password required!')
            return
        }

        if (!newPassword) {
            alert('new password required!')
            return
        }

        if (repPassword !== newPassword) {
            alert('password do not match!')
            return
        }

        try {
            const resp = await axios.put(`${baseUrl}/api/v1/password`, {
                currentPassword: currentPassword,
                newPassword: newPassword,
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            alert('password updated successful!')
            setCurrentPassword('')
            setNewPassword('')
            setRepPassword('')

        } catch (error) {
            console.error(error)
            alert(error.response.data.message)
        }

    }

    return (
        <div className='profile-container'>

            <h2 className='section-title'>Your Profile</h2>

            <img
                src={user.profilePicture || 'https://cdn-icons-png.flaticon.com/512/11820/11820201.png'}
                alt='profile'
                className='profile-image'
            />

            <h3 className='user-name'>
                {user.firstname} {user.lastname}
                <FaPencilAlt
                    className='edit-icon'
                    onClick={editProfile}
                />
            </h3>

            <h2 className='section-title security-title'>Security</h2>
            <p className='security-subtitle'>update your password</p>

            <Input
                placeholder='Enter current password'
                label='Current Password'
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
                placeholder='Enter new password'
                label='New Password'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
                placeholder='Confirm new password'
                label='Confirm new Password'
                type='password'
                value={repPassword}
                onChange={(e) => setRepPassword(e.target.value)}
            />

            <Button onClick={updatePassword}>Update Password</Button>
        </div>
    )
}

export default Profile