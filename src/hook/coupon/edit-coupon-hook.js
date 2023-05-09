import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCoupon, getOneCoupon } from '../../redux/actions/couponAction'
import notify from '../../hook/useNotification'
import { useNavigate } from 'react-router-dom'

const EditCouponHook = (id) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [couponName, setCouponName] = useState('')
  const [CouponDate, setCouponDate] = useState('')
  const [couponValue, setCouponValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(true)

  const oneCoupon = useSelector(state => state.couponReducer.oneCoupon)

  useEffect(() => {
    const get = async () => {
      setLoadingData(true)
      await dispatch(getOneCoupon(id))
      setLoadingData(false)
    }
    get()
  }, [])

  useEffect(() => {
    if (loadingData === false) {
      if (oneCoupon.data) {
        setCouponName(oneCoupon.data.name)
        // convert timestamp to custom date
        const timestamp = oneCoupon.data.expire
        const date = new Date(timestamp)
        const DATE = date.toLocaleDateString('en-US')
        setCouponDate(DATE)
        setCouponValue(oneCoupon.data.discount)
      }
    }
  }, [loadingData])

  if (oneCoupon) console.log(oneCoupon.data)

  const onChangeNameCoupon = (e) => {
    setCouponName(e.target.value)
  }
  const onChangeCouponDate = (e) => {
    setCouponDate(e.target.value)
  }
  const onChangeCouponValue = (e) => {
    setCouponValue(e.target.value)
  }

  const onSubmit = async () => {
    if (couponName !== couponName.toUpperCase()) {
      notify("المرجو ادخال الكوبون بحروف كبيرة", "warn")
      return
    }
    if (couponValue < 1) {
      notify("المرجو ادخال قيمة موجبة للكوبون", "warn")
      return
    }
    if (couponName === '' || CouponDate === '' || couponValue === '') {
      notify("المرجو ادخال قيمة الكوبون بالارقام", "warn")
      return
    }
    setLoading(true)
    await dispatch(editCoupon(id,{
      name: couponName,
      expire: CouponDate,
      discount: couponValue
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.couponReducer.editCoupon)

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify('تم تعديل الكوبون بنجاح', 'success')
        setTimeout(() => {
          navigate('/admin/addcoupon')
        }, 1000)
      }
      else {
        notify('فشل في عملية التعديل', 'warn')
      }
    }
  }, [loading])




  return [couponName, CouponDate, couponValue, onChangeNameCoupon, onChangeCouponDate, onChangeCouponValue, onSubmit]

}


export default EditCouponHook