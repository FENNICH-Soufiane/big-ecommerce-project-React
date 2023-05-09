import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCoupon, getAllCoupon } from '../../redux/actions/couponAction'
import notify from '../../hook/useNotification'

const AddCouponHook = () => {
  const dispatch = useDispatch()
  const [couponName, setCouponName] = useState('')
  const [CouponDate, setCouponDate] = useState('')
  const [couponValue, setCouponValue] = useState('')
  const [loading, setLoading] = useState(true)

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
    await dispatch(addCoupon({
      name: couponName,
      expire: CouponDate,
      discount: couponValue
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.couponReducer.addCoupon)

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 201) {
        notify('تمت اضافة الكوبون بنجاح', 'success')
        window.location.reload()
        // setCouponName('')
        // setCouponDate('')
        // setCouponValue('')
      }
      else if (res && res.status === 500) {
        notify('لا يمكن تكرار نفس الكوبون', 'warn')
      }
      else if (res && res.status === 403) {
        notify('ليس لديك الصلاحية لانشاء كوبون', 'error')
      }
      console.log(res)
    }
  }, [loading])

  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCoupon())
    }
    get()
  }, [])

  const allCoupon = useSelector(state => state.couponReducer.allCoupon)

  let coupons = []
  try {
    if (allCoupon && allCoupon.data.length >= 1) {
      coupons = allCoupon.data
    }
  }catch (e) {}
  return [couponName, CouponDate, couponValue, onChangeNameCoupon, onChangeCouponDate, onChangeCouponValue, onSubmit, coupons]

}

export default AddCouponHook