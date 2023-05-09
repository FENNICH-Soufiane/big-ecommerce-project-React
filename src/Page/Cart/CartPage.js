import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CartCheckout from '../../Components/Cart/CartCheckout'
import CartItem from '../../Components/Cart/CartItem'
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook'
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify'

const CartPage = () => {

  const [cartID, itemNum, cartItems, totalCartPrice, totalCartPriceAfterDiscout, inthePLaceOfCoupon] = GetAllUserCartHook()
  
  return (
    <Container style={{ minHeight: '670px' }}>
      <Row>
        <div className='cart-title mt-4'>عربة التسوق</div>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xs="12" md="9">
          {
            cartItems.length >= 1 ? (
              cartItems.map((item, index) => {
                return (
                  <CartItem item={item} key={index} />
                )
              })
            ) : <h4>لا يوجد منتجات حاليا في العربة</h4>
          }
        </Col>

        <Col xs="6" md="3">
          <CartCheckout cartItems={cartItems} totalCartPrice={totalCartPrice} totalCartPriceAfterDiscout={totalCartPriceAfterDiscout} inthePLaceOfCoupon={inthePLaceOfCoupon} />
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default CartPage
