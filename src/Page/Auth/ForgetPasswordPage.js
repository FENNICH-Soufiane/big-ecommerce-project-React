import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify';

import ForgetPasswordHook from '../../hook/auth/forget-password-hook'

const ForgetPasswordPage = () => {

  // 2 step pass varaible from forget-password-hook.js
  const [email, OnChangeEmail, onSubmit] = ForgetPasswordHook()

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">نسيت كلمة السر</label>
          <input
            value={email}
            onChange={OnChangeEmail}
            placeholder="ادخل الايميل ..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />

          <button onClick={onSubmit} className="btn-login mx-auto mt-4">ارسال الكود </button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}
export default ForgetPasswordPage