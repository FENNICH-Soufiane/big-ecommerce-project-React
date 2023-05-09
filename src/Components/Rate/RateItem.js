import React from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import rate from '../../images/rate.png'
import DeleteRateHook from '../../hook/review/delete-rate-hook'
import { ToastContainer } from 'react-toastify'
import EditRateHook from '../../hook/review/edit-rate-hook'
import ReactStars from "react-rating-stars-component";

const RateItem = ({ review }) => {
  // console.log(review)
  // console.log(JSON.parse(localStorage.getItem('user')))

  const [isUser, handelDelete, handelShow, handleClose, showDelete] = DeleteRateHook(review)
  const [showEdit, handelShowEdit, handleCloseEdit, handelEdit, onChangeRateText, newRateText, onChangeRateValue, newRateValue] = EditRateHook(review)

  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    // value: 7.5,
    value: newRateValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      onChangeRateValue(newValue)
      console.log(`Example 2: new value is ${newValue}`);
    }
  };

  return (
    <div>

      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header className='border-0'>
          <Modal.Title className='font'>تاكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font'>هل انت متاكد من حذف التقييم </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="danger" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header className='border-0'>
          <Modal.Title className='font'>تعديل التقييم</Modal.Title>
        </Modal.Header>
        <Modal.Body className='font'>
          <input onChange={onChangeRateText} value={newRateText} type='text' className='w-100' />
          <ReactStars {...setting} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseEdit}>
            الغاء
          </Button>
          <Button variant="danger" onClick={handelEdit}>
            تعديل
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-3">
        <Col className="d-felx me-5">
          <div className="rate-name  d-inline ms-2">{review.user.name}</div>
          <img className="" src={rate} alt="" height="16px" width="16px" />
          <div className="cat-rate  d-inline  p-1 pt-2">{review.ratings}</div>
        </Col>
      </Row>
      <Row className="border-bottom mx-2 ">
        <Col className="d-flex me-4 pb-2 justify-content-between">
          <div className="rate-description  d-inline ms-2">
            {review.title}
          </div>
          {
            isUser ? (
              <div className='d-inline d-flex justify-content-end'>
                <i onClick={handelShow} className="fa-sharp fa-solid fa-trash fa-xl ms-4" style={{ cursor: "pointer" }}></i>
                <i onClick={handelShowEdit} className="fa-solid fa-pen-to-square fa-xl" style={{ cursor: "pointer" }}></i>
              </div>
            ) : null
          }

        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default RateItem
