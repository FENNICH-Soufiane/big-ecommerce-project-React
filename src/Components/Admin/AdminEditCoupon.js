import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import EditCouponHook from '../../hook/coupon/edit-coupon-hook'

const AdminEditCoupon = () => {

  const { id } = useParams()
  const [couponName, CouponDate, couponValue, onChangeNameCoupon, onChangeCouponDate, onChangeCouponValue, onSubmit] = EditCouponHook(id)
  const dateRef = useRef()
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">تعديل بيانات الكوبون</div>
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
          <button onClick={onSubmit} className="btn-save d-inline mt-2 ">حفظ التعديل</button>
        </Col>
      </Row>


      <ToastContainer />
    </div>
  )
}

export default AdminEditCoupon