import React from 'react'
import { Row, Col } from 'react-bootstrap'
import CartItem from '../Cart/CartItem'
import UserAllOrderItem from '../User/UserAllOrderItem'
import { useParams } from 'react-router-dom'
import GetOrderDetailsHook from '../../hook/admin/get-order-details-hook'
import ChangeOrderStatusHook from '../../hook/admin/change-order-status-hook'
import { ToastContainer } from 'react-toastify'

const AdminOrderDetalis = () => {
  const { id } = useParams()
  const [orderData, cartItems] = GetOrderDetailsHook(id)
  // console.log(orderData)

  
  const [onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder] = ChangeOrderStatusHook(id)
  return (
    <div>
      <UserAllOrderItem orderItem={orderData} />

      <Row className="justify-content-center mt-4 user-data">
        <Col xs="12" className=" d-flex">
          <div className="admin-content-text py-2">تفاصيل العميل</div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}>
            الاسم:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2">
            {orderData.user ? orderData.user.name : ''}
          </div>
        </Col>

        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}>
            رقم الهاتف:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2">
            {orderData.user ? orderData.user.phone : 'no data'}
          </div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}>
            الايميل:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2">
            {orderData.user ? orderData.user.email : ''}
          </div>
        </Col>

        <div className="d-flex mt-2 justify-content-center">
          <div>
            <select
            onChange={onChangePaid}
              name="pay"
              id="paid"
              className="select input-form-area mt-1  text-center px-2 w-100">
              <option value="0"> الدفع</option>
              <option value="true">تم</option>
              <option value="false">لم يتم</option>
            </select>
            <button onClick={changePayOrder} className="btn-a px-3 d-inline mx-2 ">حفظ </button>
          </div>
          <div>
            <select
              onChange={onChangeDeliver}
              name="deliver"
              id="deliver"
              className="select input-form-area mt-1  text-center px-2 w-100">
              <option value="0"> التوصيل</option>
              <option value="true">تم</option>
              <option value="false">لم يتم</option>
            </select>
            <button onClick={changeDeliverOrder} className="btn-a px-3 d-inline mx-2 ">حفظ </button>
          </div>
        </div>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default AdminOrderDetalis
