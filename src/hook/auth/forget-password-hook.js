import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forgetPassword } from '../../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import notify from '../useNotification'

const ForgetPasswordHook = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 1 first step create variable (element)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  const OnChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async () => {
    if (email === "") {
      notify('المرجو ادخال الايميل', 'error')
      return
    }
    // pour mettre l'email dans l'input lors de d'inscription apres le reset password
    // en liaison avec reset-password-hook ligne 33
    localStorage.setItem("user-email", email)
    setLoading(true)
    await dispatch(forgetPassword({
      email
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.authReducer.forgetPassword)

  useEffect(() => {
    if(loading === false ) {
      if (res) {
        console.log(res)
        if (res.data.status === 'Succes') {
          notify('تم ارسال الكود للايميل بنجاح', 'success')
          setTimeout(() => {
            navigate('/user/verify-code')
          },1200)
        }
        if (res.data.status === 'fail') {
          notify('هذا الحساب غير موجود لدينا', 'error')
        }
      }
    }
  }, [loading])

  return [email, OnChangeEmail, onSubmit]
}

export default ForgetPasswordHook