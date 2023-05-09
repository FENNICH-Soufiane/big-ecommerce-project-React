import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import mobile from '../../images/mobile.png'
import deleteicon from '../../images/delete.png'
import DeleteCartHook from '../../hook/cart/delete-cart-hook'
import UpdateQtyProductHook from '../../hook/cart/update-qty-product-hook'

const CartItem = ({ item }) => {

  const [handelDeleteCart, show, handleClose, handelShow, handelDeleteItem] = DeleteCartHook(item)
  const [itemQuantity, onChangeQuantity, handleUpdateCart] = UpdateQtyProductHook(item)

  return (
    <Col xs="12" className="cart-item-body my-2 d-flex px-2">

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='border-0'>
          <Modal.Title className='font'>تاكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font'>هل انت متاكد من حذف المنتج من عربة التسوق !</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="danger" onClick={handelDeleteItem}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>


      <img width="160px" height="197px" src={mobile} alt="" />
      <div className="w-100">
        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 cat-text">pas de donne dans la backend</div>
            <div onClick={handelShow} className="d-flex pt-2 " style={{ cursor: "pointer" }}>
              <img src={deleteicon} alt="" width="20px" height="24px" />
              <div className="cat-text d-inline me-2">ازاله</div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col sm="12" className=" d-flex flex-row justify-content-start">
            <div className="d-inline pt-2 cat-title">
              pas de donne dans la backend
            </div>
            <div className="d-inline pt-2 cat-rate me-2">4.5</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-1">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="barnd-text d-inline mx-1">ابل </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-1 d-flex">
            {item.color === "" ? null : <div
              className="color ms-2 border"
              style={{ backgroundColor: `${item.color}` }}></div>}
          </Col>
        </Row>

        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 d-flex">
              <div className="cat-text mt-2 d-inline">الكميه</div>
              <input           
                // value={item.quantity}
                value={itemQuantity}
                onChange={onChangeQuantity}
                className="mx-2 text-center"
                type="number"
                style={{ width: "60px", height: "40px" }}
              />
              <button onClick={handleUpdateCart} className='btn btn-dark btn-sm'>تطبيق</button>
            </div>
            <div className="d-inline pt-2 barnd-text">{item.price} جنيه </div>
          </Col>
        </Row>
      </div>
    </Col>
  )
}

export default CartItem
