import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown'
import MultiImageInput from 'react-multiple-image-input'
import { CompactPicker } from 'react-color'

import { ToastContainer } from 'react-toastify'

import add from '../../images/add.png'
import AddProductsHook from '../../hook/products/add-products-hook'



const AdminAddProducts = () => {

  const [load, images, setImages, prodName, setProdName, prodDescription, setProdDescription, priceBefore, setPriceBefore, priceAfter, setPriceAfter, qty, setQty, onSelectCategory, category, options, onSelect, onRemove, onSelectBrand, brand, colors, removeColor, onChangeColor, showColor, handelSubmit, handleChangeComplete, loading] =AddProductsHook() 



  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
        <Col sm="8">
          <div className="text-form pb-2"> صور للمنتج</div>



          {/* <img src={avatar} alt="" height="100px" width="120px" /> */}


          <MultiImageInput
            images={images}
            setImages={setImages}
            // cropConfig={{ crop, ruleOfThirds: true }} les parametres sont en haut
            // theme={theme} les parametres sont en haut
            theme={"light"}
            allowCrop={false}
            max={5}
          />




          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
          />
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
            value={prodDescription}
            onChange={(e) => setProdDescription(e.target.value)}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
            value={priceBefore}
            onChange={(e) => setPriceBefore(e.target.value)}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر بعد الخصم"
            value={priceAfter}
            onChange={(e) => setPriceAfter(e.target.value)}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <select
            onChange={onSelectCategory}
            name="category"
            className="select input-form-area mt-3 px-2 ">
            <option value="0">التصنيف الرئيسي</option>
            {
              category.data ? (category.data.map((item, index) => {
                return (
                  <option key={index} value={item._id}>{item.name}</option>
                )
              }))
                : (null)

            }
          </select>

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            emptyRecordMsg='لا يوجد تصنيفات فرعية'
            displayValue="name"
            style={{ color: "red" }}
          />
          <select
            onChange={onSelectBrand}
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 ">
            <option value="0">الماركة</option>
            {
              brand.data ? (brand.data.map((item, index) => {
                return (
                  <option key={index} value={item._id}>{item.name}</option>
                )
              })) : null
            }


          </select>

          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
          <div className="mt-1 d-flex">
            {
              colors.length >= 1 ? (colors.map((item, index) => {
                return (
                  (<div
                    key={index}
                    onClick={() => removeColor(item)}
                    className="color ms-2 border  mt-1"
                    style={{ backgroundColor: item }}></div>)
                )
              })) : null
            }


            <img onClick={onChangeColor} src={add} alt="" width="30px" height="35px" className="" style={{ cursor: 'pointer' }} />
            {
              showColor ? <CompactPicker onChangeComplete={handleChangeComplete} /> : null
            }
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </Col>
      </Row>
      {load ? <Spinner animation="border" /> : null}
      <ToastContainer />
    </div>
  )
}

export default AdminAddProducts
