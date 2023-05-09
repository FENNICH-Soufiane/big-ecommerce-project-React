import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify';

import VerifyPasswordHook from '../../hook/auth/verify-password-hook';

const VerifyPasswordPage = () => {

  // 2 step pass varaible from forget-password-hook.js
  const [code, OnChangeCode, onSubmit] = VerifyPasswordHook()

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">ادخل الكود المرسل في الايميل</label>
          <input
            value={code}
            onChange={OnChangeCode}
            placeholder="ادخل الكود ..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />

          <button onClick={onSubmit} className="btn-login mx-auto mt-4">تاكيد</button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default VerifyPasswordPage