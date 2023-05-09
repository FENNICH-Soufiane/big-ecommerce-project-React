import React, { useState } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import deleteicon from '../../images/delete.png'
import CouponCardHook from '../../hook/coupon/coupon-card-hook';

const AdminCouponCard = ({ coupon }) => {

  const [DATE, show, handleClose, handleShow, handelDelete] = CouponCardHook(coupon)


  return (
    <div className="user-address-card my-3 px-2">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='border-0'>
          <Modal.Title className='font'>تاكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font'>هل انت متاكد من عملية حذف الكوبون !</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="danger" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="d-flex justify-content-between  ">
        <Col xs="6">
          <div className="p-2 mt-2">اسم الكوبون {coupon.name} </div>
        </Col>
        <Col xs="4" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <Link to={`/admin/editcoupon/${coupon._id}`} style={{ textDecoration: "none" }}>
              <div className="d-flex mx-2">
                <img
                  alt=""
                  className="ms-1 mt-2"
                  src={deleteicon}
                  height="17px"
                  width="15px"
                />
                <p className="item-delete-edit"> تعديل</p>
              </div>
            </Link>
            <div className="d-flex" onClick={handleShow}>
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit"> ازاله</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="">
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}>
            تاريخ الانتهاء :
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2">
            {DATE}
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}>
            نسبة الخصم:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2">
            {coupon.discount}%
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AdminCouponCard