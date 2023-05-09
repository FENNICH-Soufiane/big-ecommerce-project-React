import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../../redux/actions/authAction'
import notify from '../useNotification'

const ResetPasswordHook = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)

  const OnChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const OnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const onSubmit = async () => {
    if (password === '') {
      notify('المرجو ادخال كلمة السر', 'error')
      return
    }
    if (password != confirmPassword) {
      notify('كلمة السر غير متطابقة', 'error')
      return
    }
    setLoading(true)
    await dispatch(resetPassword({     
      email: localStorage.getItem("user-email"),
      newPassword: password
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.authReducer.resetPassword)

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res.status)
        // console.log(res.data)
        // console.log(res.data.status)
        if(res.status === 200) {
          notify('تم تغيير كلمة السر بنجاح', 'success')
          setTimeout(() => {
            navigate('/login')
          }, 1200)
        }
        if(res.data.status === 'fail') {
          notify('من فضلك اطلب كود جديد', 'error')
          
        }
      }
    }
  }, [loading])

  return [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit]
}

export default ResetPasswordHook