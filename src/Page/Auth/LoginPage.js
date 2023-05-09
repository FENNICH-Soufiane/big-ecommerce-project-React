import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify';

import LoginHook from '../../hook/auth/login-hook'

const LoginPage = () => {

  const [email, password, loading, isPress, onChangeEmail, onChangePassword, onSubmit] = LoginHook()

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">تسجيل الدخول</label>
          <input
            value={email}
            onChange={onChangeEmail}
            placeholder="الايميل..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            value={password}
            onChange={onChangePassword}
            placeholder="كلمه السر..."
            type="password"
            className="user-input text-center mx-auto"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-4">تسجيل الدخول</button>
          <label className="mx-auto my-4">
            ليس لديك حساب ؟{" "}
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>

          <label className="mx-auto my-4">          
            <Link to="/user/forget-password" style={{ textDecoration: 'none', color: 'red' }}>             
              هل نسيت كلمة السر
            </Link>
          </label>


          {loading ?
          (isPress === true ?(<Spinner animation="border" role="status"></Spinner>)
          : null) : null}

        </Col>

      </Row>
      <ToastContainer />
    </Container>
  )
}

export default LoginPage
