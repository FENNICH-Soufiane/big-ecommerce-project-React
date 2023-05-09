// this hook is for delete coupon
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCoupon } from '../../redux/actions/couponAction'

const CouponCardHook = (coupon) => {

  // convert date timestamp to custom date in javascript
  const timestamp = coupon.expire
  const date = new Date(timestamp)
  // console.log(date)
  // console.log(date.toDateString());
  const DATE = date.toLocaleDateString('en-US')

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // method for delete coupon
  const handelDelete = async () => {
    await dispatch(deleteCoupon(coupon._id))
    setShow(false)
    window.location.reload()
  }

  return [DATE, show, handleClose, handleShow, handelDelete]
}

export default CouponCardHook