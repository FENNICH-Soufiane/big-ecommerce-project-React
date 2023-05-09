import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import notify from '../../hook/useNotification'
import { addUserAddress } from '../../redux/actions/userAddressesAction'
import { useNavigate } from 'react-router-dom'

const AddAddressHook = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alias, setAlias] = useState('')
  const [details, setDetails] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)

  const onChangeAlias = (e) => {
    setAlias(e.target.value)
  }
  const onChangeDetails = (e) => {
    setDetails(e.target.value)
  }
  const onChangePhone = (e) => {
    setPhone(e.target.value)
  }

  const onSubmit = async () => {
    if (alias === "" || details === "" || phone === "") {
      notify('المرجو ادخال كل البيانات', 'warn')
      return
    }
    setLoading(true)
    await dispatch(addUserAddress({
      alias: alias,
      details: details,
      Phone: phone,
      city: "",
      postal: ""
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.userAddressesReducer.addUserAddress)
  // console.log(res)
  useEffect(() => {
    if(loading === false) {
      if (res && res.status === 200) {
        notify('تمت اضافة العنوان بنجاح', 'success')
        setTimeout(() => {
          navigate('/user/addresses')
        }, 1000)
      } 
      else  {
        notify(' هناك مشكلة في اضافة العنوان حاول لاحقا', 'warn')
      }
    }
  }, [loading])

  return [alias, details, phone, onChangeAlias, onChangeDetails, onChangePhone, onSubmit]
}

export default AddAddressHook