import React, { useState } from 'react'
import { Col, Card, Row, Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import prod1 from '../../images/prod1.png'
import { deleteProducts } from '../../redux/actions/productsAction'
const AdminAllProductsCard = ({ item }) => {

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // method for delete
  const handelDelete = async () => {
    await dispatch(deleteProducts(item._id))
    setShow(false)
    window.location.reload()
    console.log(item._id)
  }

  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='border-0'>
          <Modal.Title className='font'>تاكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font'>هل انت متاكد من عملية الحذف !</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="danger" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}>
        <Row className="d-flex justify-content-center px-2">
          <Col className=" d-flex justify-content-between">
            <div onClick={handleShow} className="d-inline item-delete-edit">ازاله</div>
            <Link to={`/admin/editproduct/${item._id}`} style={{ textDecoration: "none" }}>
              <div className="d-inline item-delete-edit">تعديل</div>
            </Link>
          </Col>
        </Row>
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <Card.Img style={{ height: "228px", width: "100%" }} src={item.imageCover} />
          <Card.Body>
            <Card.Title>
              <div className="card-title">
                {item.title}
              </div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <div className="card-rate">{item.ratingsQuantity}</div>
                <div className="d-flex">
                  <div className="card-currency mx-1 ">
                    {
                      item.priceAfterDiscount >= 1 ?
                        (<><sapn className="fs-4 card-price">{item.priceAfterDiscount}</sapn><span className="text-decoration-line-through fs-6 card-price">{item.price}</span></>)
                        : <span className="card-price">{item.price}</span>
                    }
                    جنيه</div>
                  {/* <div className="card-price">{item.price}</div> */}
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  )
}

export default AdminAllProductsCard
