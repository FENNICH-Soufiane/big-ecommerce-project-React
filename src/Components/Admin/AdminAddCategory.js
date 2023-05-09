import React from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import AddCategoryHook from '../../hook/category/add-category-hook'

import { ToastContainer } from 'react-toastify';

const AdminAddCategory = () => {

  const [img, name, loading, isPress,onChangeName, handelSubmit, onImageChange] = AddCategoryHook()

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره التصنيف</div>
          {/* <img src={avatar} alt="" height="100px" width="120px" /> */}
          <div>
            <label htmlFor="upload-photo">
              <img src={img} alt="logo-add-category" height="100px" width="100px" />
            </label>
            <input type="file" name='photo' onChange={onImageChange} id="upload-photo" />
          </div>

          <input
            value={name}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </Col>
      </Row>
      {
        isPress ? loading ? (<Spinner animation="border" variant='primary' />) : (<h4>chargement terminer</h4>) : null
      }
      <ToastContainer />
    </div>
  )
}

export default AdminAddCategory
