import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import DeleteCartHook from '../../hook/cart/delete-cart-hook'
import { ToastContainer } from 'react-toastify'
import ApplyCouponHook from '../../hook/cart/apply-coupon-hook'
import notify from '../../hook/useNotification'

const CartCheckout = ({ totalCartPrice, totalCartPriceAfterDiscout, inthePLaceOfCoupon, cartItems }) => {

  const navigate = useNavigate()
  const [handelDeleteCart] = DeleteCartHook()
  const [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout] = ApplyCouponHook(cartItems)
    
  useEffect(() => {
    if(inthePLaceOfCoupon) {
      onChangeCoupon(inthePLaceOfCoupon)
    }
  }, [inthePLaceOfCoupon])

  

  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            className="copon-input d-inline text-center "
            placeholder="كود الخصم"
          />
          <button onClick={handleSubmitCoupon} className="copon-btn d-inline ">تطبيق</button>
        </div>
        <div className="product-price d-inline w-100 my-3  border">
          {/* {totalCartPrice || 0} جنية */}
          {
            totalCartPriceAfterDiscout >=1 ? (<p>قبل الخصم {totalCartPrice} جنيه ... بعد الخصم {totalCartPriceAfterDiscout} جنيه</p>) : `${totalCartPrice}`
          }
          </div>
       
          <button onClick={handleCheckout} className="product-cart-add w-100 px-2 product-cart-add  d-inline"> اتمام الشراء</button>
        
        <button onClick={handelDeleteCart} className="product-cart-add w-100 px-2 my-2">مسح العربة</button>
      </Col>
      <ToastContainer />
    </Row>
  )
}

export default CartCheckout
