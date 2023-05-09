// verify code send in email

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { verifyPassword } from '../../redux/actions/authAction'
import notify from '../useNotification'

const VerifyPasswordHook = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)

  const OnChangeCode = (e) => {
    setCode(e.target.value)
  }

  const onSubmit = async () => {
    if (code === '') {
      notify('من فضلك ادخل الكود', 'error')
      return
    }
    setLoading(true)
    await dispatch(verifyPassword({
      resetCode: code
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.authReducer.verifyPassword)

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res)
        if(res.data.status === 'Succes') {
          notify('كود التفعيل صحيح', 'success')
          setTimeout(() => {
            navigate('/user/reset-password')
          }, 1200)
        }
        if(res.data.status === 'error') {
          notify('كود التفعيل خاطئ او انتهت صلاحيته', 'error')
        }
      }
    }
  }, [loading])

  return [code, OnChangeCode, onSubmit]
}

export default VerifyPasswordHook