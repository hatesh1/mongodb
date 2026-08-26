import './App.css'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Posts from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import axios from 'axios'
import { baseUrl } from './core'
import { store } from './store/states'
import SplashScreen from './pages/SplashScreen'

const App = () => {
  const { globalLogin, globalLogout, user, isLogin } = store()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/profile`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      globalLogin(resp.data.data)

    } catch (error) {
      console.error(error)
      globalLogout()
    }
  }

  return (
    <>
      {isLogin == null ? <SplashScreen /> : null}

      {
        isLogin == true ?
          <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes> :
          null
      }

      {
        isLogin == false ?
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes> :
          null
      }
    </>
  )
}

export default App