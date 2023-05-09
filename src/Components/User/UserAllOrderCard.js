import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mobile from '../../images/mobile.png'
const UserAllOrderCard = ({ item }) => {
  // console.log(item)
  return (
    <div>
      <Row className="d-flex mb-2">
        <Col xs="3" md="2" className="d-flex justify-content-start">
          <Link to={`/products/${item._id}`}>
            <img width="93px" height="120px" src={item.product ? item.product.imageCover: mobile} alt="" />
          </Link>
        </Col>
        <Col xs="8" md="6">
          <div className="d-inline pt-2 cat-title">
            آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس
            تايم (برودكت) أحمر
          </div>
          <div className="d-inline pt-2 cat-rate me-2">{item.product ? item.product.ratingsAverage : 0}</div>
          <div className="rate-count d-inline p-1 pt-2">{item.product ? item.product.ratingQuantity:  0}</div>
          <div className="mt-3 d-flex">
            <div className="cat-text  d-inline">الكميه</div>
            <input
              value={item.quantity}
              className="mx-2 "
              type="number"
              style={{ width: "40px", height: "25px" }}
            />
            <div
              className="color ms-2 "
              style={{ backgroundColor: item.color }}>
            </div>
          </div>



        </Col>
      </Row>
    </div>
  )
}

export default UserAllOrderCard
