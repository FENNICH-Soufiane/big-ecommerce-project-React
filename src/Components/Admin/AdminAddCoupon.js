import React, { useEffect, useRef } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import AddCouponHook from '../../hook/coupon/add-coupon-hook'
import AdminCouponCard from './AdminCouponCard'

const AdminAddCoupon = () => {

  const [couponName, CouponDate, couponValue, onChangeNameCoupon, onChangeCouponDate, onChangeCouponValue, onSubmit, coupons] = AddCouponHook()
  console.log(coupons)
  const dateRef = useRef()

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافة كوبون</div>
        <Col sm="8">
          <input
            value={couponName}
            onChange={onChangeNameCoupon}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم الكوبون"
          />
          <input
            value={CouponDate}
            onChange={onChangeCouponDate}
            ref={dateRef}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الانتهاء"
            onFocus={() => dateRef.current.type = 'date'}
            onBlur={() => dateRef.current.type = 'text'}
          />
          <input
            value={couponValue}
            onChange={onChangeCouponValue}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="نسبة خصم الكوبون"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={onSubmit} className="btn-save d-inline mt-2 ">حفظ الكوبون</button>
        </Col>
      </Row>
      <Row>
        <Col sm="8">
          {
            coupons ? (coupons.map((item, index) => {
              return (<AdminCouponCard key={index} coupon={item} />)
            })) 
            : <h4>لا يوجد كوبون حتى الان</h4>
          }

        </Col>
      </Row>

      <ToastContainer />
    </div>
  )
}

export default AdminAddCoupon