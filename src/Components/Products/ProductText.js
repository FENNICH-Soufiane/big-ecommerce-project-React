import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ViewProductsDetailsHook from '../../hook/products/view-products-details-hook'
import AddToCartHook from '../../hook/cart/add-to-cart-hook'
import { ToastContainer } from 'react-toastify'

const ProductText = () => {
  const { id } = useParams()
  // item renvoie les données des produits
  const [item, images, name, brand, rating] = ViewProductsDetailsHook(id)
  // console.log(item)
  const [indexColor, colorClick, addToCartHandel] = AddToCartHook(id, item)




  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{name} :</div>
      </Row>
      <Row>
        <Col md="8">

          <div className="cat-title d-inline">
            {item.title}
            <div className="cat-rate d-inline mx-3">
              {item.ratingsAverage}</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="barnd-text d-inline mx-1">{brand}</div>
        </Col>
      </Row>
      
      <Row>
        <Col md="8" className="mt-1 d-flex">
          {
            item.colors ? (item.colors.map((color, index) => {
              return (
                <div
                  key={index}
                  // onClick={() => console.log(color)}
                  onClick={() => colorClick(index, color)}
                  className="color ms-2"
                  style={{ backgroundColor: color, border: indexColor === index ? '2px solid black' : 'none' }}>
                </div>
              )
            }))
              : null
          }

        </Col>
      </Row>

      <div className="cat-text d-inline">الماركة : {item.quantity}</div>
      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {item.description}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">
            {
              item.priceAfterDiscount >= 1 ?
                (<><sapn className="fs-4">{item.priceAfterDiscount}</sapn><span className="text-decoration-line-through fs-6">{item.price}</span></>)
                : item.price
            }
            جنية</div>
          <div onClick={addToCartHandel} className="product-cart-add px-3 py-3 d-inline mx-3">اضف للعربة</div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default ProductText
