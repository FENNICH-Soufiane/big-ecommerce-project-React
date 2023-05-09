import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
// import ViewAddressesHook from'.././hook/user/view-addresses-hook.js'
import ViewAddressesHook from '../../hook/user/view-addresses-hook'
import OrderPayCashHook from '../../hook/checkout/order-pay-cash-hook'
import { ToastContainer } from 'react-toastify'
import notify from '../../hook/useNotification'
import OrderPayCardHook from '../../hook/checkout/order-pay-card-hook'
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook'



const ChoosePayMethoud = () => {

  const [res] = ViewAddressesHook()
  const [handleChooseAddress, handleCreateOrderCash] = OrderPayCashHook()
  const [handleCreateOrderCard] = OrderPayCardHook()
  const [, , , totalCartPrice, totalCartPriceAfterDiscout,] = GetAllUserCartHook()

  const [typePay, setTypePay] = useState('')
  const changeMethod = (e) => {
    setTypePay(e.target.value)
    console.log(e.target.value)
  }

  const handlePay = () => {
    if (typePay === 'CARD') {
      handleCreateOrderCard()
    }
    else if (typePay === 'CASH') {
      handleCreateOrderCash()
    }
    else {
      notify('من فضلك اختر طريقة الدفع', 'warn')
    }
  }
  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between ">
          <Col xs="12" className="my-4">
            <input
              onChange={changeMethod}
              style={{ cursor: 'pointer' }}
              name="group"
              id="group1"
              type="radio"
              value="CARD"
              className="mt-2"
            />
            <label style={{ cursor: 'pointer' }} className="mx-2" for="group1">
              الدفع عن طريق البطاقه الائتمانية
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="12" className="d-flex" style={{ cursor: 'pointer' }}>
            <input
              onChange={changeMethod}
              style={{ cursor: 'pointer' }}
              name="group"
              id="group2"
              type="radio"
              value="CASH"
              className="mt-2"
            />
            <label style={{ cursor: 'pointer' }} className="mx-2" for="group2">
              الدفع عند الاستلام
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="6" className="d-flex" style={{ cursor: 'pointer' }}>
            <select name="category" id="cat" className="select mt-3 px-2" onChange={handleChooseAddress} >
              <option value="0">اختر عنوان الشحن</option>
              {
                res.data && res.data.length >= 1 ? (
                  res.data.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>{item.alias}</option>
                    )
                  })
                ) : <option key={0} value={0}>لا يوجد عناوين مسجلة </option>
              }

            </select>
          </Col>
        </Row>

      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-inline   border">
            {
              totalCartPriceAfterDiscout >= 1 ? (<p>قبل الخصم {totalCartPrice} جنيه ... بعد الخصم {totalCartPriceAfterDiscout} جنيه</p>) : `${totalCartPrice}`
            }
          </div>
          <div onClick={handlePay} className="product-cart-add px-3 pt-2 d-inline me-2"> اتمام الشراء</div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default ChoosePayMethoud
