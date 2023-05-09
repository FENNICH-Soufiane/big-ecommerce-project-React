import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { createNewUser } from '../../redux/actions/authAction';
import notify from './../useNotification';

const RegisterHook = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState('')

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePhone = (e) => {
    setPhone(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  // @desc regle de validation sur les champs de l'engistrement
  const validationVlaues = () => {
    if (name === '') {
      notify('من فضلك ادخل اسم المستخدم ...', "error")
      return;
    }
    if (phone.length <= 9) {
      notify('من فضلك ادخل رقم هاتف صحيح ...', "error")
      return;
    }
    if (password !== confirmPassword) {
      notify('من فضلك تاكد من كلمة السر ...', "error")
      return;
    }
  }

  const res = useSelector(state => state.authReducer.createUser)
  // save data
  const OnSubmit = async () => {
    validationVlaues()
    setLoading(true)
    // @desc CreateNewUser is action (authAction.js)
    await dispatch(createNewUser({
      name,
      email,
      password,
      passwordConfirm: confirmPassword,
      phone
    }))
    setLoading(false)
  }
 
  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res)
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          notify('تم التسجيل بنجاح ...', 'success')
          setTimeout(() => {
            navigate('/login')
          }, 2000);

        }
        if (res.data.errors) {
          if (res.data.errors[0].msg === 'Email already exists or already user')
            notify('هذا الايميل مسجل من قبل ...', 'error')
          // notify(res.data.errors[0].msg, 'error')
        }
      }
    }
  }, [loading])

  return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit]
}

export default RegisterHook