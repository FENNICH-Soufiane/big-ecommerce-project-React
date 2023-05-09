import React, { useState } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import deleteicon from '../../images/delete.png'

import ProfileHook from '../../hook/user/profile-hook'
import { ToastContainer } from 'react-toastify'
const UserProfile = () => {

  const [user, show, handleClose, handleShow, handelSubmit, name, email, phone, onChangeName, onChangeEmail, onChangePhone, changePassword, oldPassword, newPassword, confirmNewPassword, onChangeOldPassword, onChangeNewPassword, onChangeConfirmNewPassword] = ProfileHook()


  return (
    <div>
      <div className="admin-content-text">الصفحه الشخصية</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='border-0'>
          <Modal.Title className='font'>تعديل البيانات الشخصية</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font'>
          <input
            value={name}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المستخدم"
          />
          <input
            value={email}
            onChange={onChangeEmail}
            type="email"
            className="input-form d-block mt-3 px-3"
            placeholder="الايميل"
          />
          <input
            value={phone}
            onChange={onChangePhone}
            type="phone"
            className="input-form d-block mt-3 px-3"
            placeholder="الهاتف"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="danger" onClick={handelSubmit}>
            حفظ التعديل
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="user-address-card my-3 px-2">
        <Row className="d-flex justify-content-between pt-2">
          <Col xs="6" className="d-flex">
            <div className="p-2">الاسم:</div>
            <div className="p-1 item-delete-edit">{user.name}</div>
          </Col>
          <Col xs="6" className="d-flex justify-content-end">
            <div onClick={handleShow} className="d-flex mx-2">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit"> تعديل</p>
            </div>
          </Col>
        </Row>

        <Row className="">
          <Col xs="12" className="d-flex">
            <div className="p-2">رقم الهاتف:</div>
            <div className="p-1 item-delete-edit">il y a pas de numero de telephone dans le backend</div>
          </Col>
        </Row>
        <Row className="">
          <Col xs="12" className="d-flex">
            <div className="p-2">الايميل:</div>
            <div className="p-1 item-delete-edit">{user.email}</div>
          </Col>
        </Row>


        <Row className="mt-5">
          <Col xs="10" sm="8" md="6" className="">
            <div className="admin-content-text">تغير كملة المرور</div>
            <input
              type="password"
              className="input-form d-block mt-1 px-3"
              placeholder="pas de current pass en backend"
            />
            <input
              value={newPassword}
              onChange={onChangeNewPassword}
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder="ادخل كلمة المرور الجديده"
            />
            <input
              value={confirmNewPassword}
              onChange={onChangeConfirmNewPassword}
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder='تاكيد كلمة السر'
            />

          </Col>
        </Row>

        <Row>
          <Col xs="10" sm="8" md="6" className="d-flex justify-content-end ">
            <button onClick={changePassword} className="btn-save d-inline mt-2 ">حفظ كلمة السر</button>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProfile
