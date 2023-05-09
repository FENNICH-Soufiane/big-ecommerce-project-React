import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import notify from '../useNotification'
import createNewUser from '../../redux/actions/authAction'
import { loginUser } from '../../redux/actions/authAction'

const LoginHook = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [isPress, setIsPress] = useState(false)

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = async () => {
    setIsPress(true)
    setLoading(true)
    await dispatch(loginUser({
      email,
      password
    }))
    setLoading(false)
    setIsPress(false)
  }
  
  const res = useSelector(state => state.authReducer.loginUser)

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res)
        // console.log(res.data)
        // console.log(res.data.token)
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.data))

          notify("تم تسجيل الدخول بنجاح", "success")
          setTimeout(() => {
            // navigate('/')
            window.location.href = '/'
          }, 1500)
        }
        else {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
        if(res.data.message === 'Incorrect email or password') {
          notify("الايميل او كلمة السر خطا", "error")
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
        setLoading(true)
      }
    }
  }, [loading])

  return [email, password, loading, isPress, onChangeEmail, onChangePassword, onSubmit]
}

export default LoginHook