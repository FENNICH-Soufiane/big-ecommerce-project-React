import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import notify from "../useNotification"
import { applyCouponCart } from "../../redux/actions/cartAction"
import { useNavigate } from "react-router-dom"


const ApplyCouponHook = (cartItems) => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [couponName, setCouponName] = useState('')
  // const [after, setAfter] = useState('')

  const onChangeCoupon = (e) => {
    setCouponName(e)
  }

  const handleSubmitCoupon = async () => {
    if (couponName === '') {
      notify('من فضلك ادخل الكوبون', 'warn')
      return
    }
    setLoading(true)
    await dispatch(applyCouponCart({
      coupon: couponName
    }))
    setLoading(false)
  }

  const res = useSelector(state => state.cartReducer.applayCoupon)
  // let after =[]
  useEffect(() => {
    if (loading === false) {
      if (res.status === 200) {
        notify('تم تطبيق الكوبون بنجاح', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      else {
        notify('الكوبون غير صالح او انتهت صلاحيته', 'warn')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }
  }, [loading])

  const handleCheckout = () => {
    if(cartItems.length >= 1) {
      navigate('/order/paymethoud')
    }
    else {
      notify('من فضلك اضف منتجات للعربة', 'warn')
    }
  }
  return [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout]

}

export default ApplyCouponHook