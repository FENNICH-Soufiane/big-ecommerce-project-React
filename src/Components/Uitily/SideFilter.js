import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import SidebarSearchHook from '../../hook/search/sidebar-search-hook'

const SideFilter = () => {
  const [category, brand, clickCategory, clickBrand, priceFrom, priceTo] = SidebarSearchHook()
  let localFrom = localStorage.getItem('priceFrom')
  let localTo = localStorage.getItem('priceTo')

  const [showNext, setShowNext] = useState(false);
  const toggleShowNext = () => {
    setShowNext(!showNext);
  };
  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="0" onChange={clickCategory} />
            <div className="filter-sub me-2 ">الكل</div>
          </div>
          {
            category ? (category.slice(0, 6).map((item, index) => {
              return (
                <div className="d-flex mt-2" key={index}>
                  <input type="checkbox" value={item._id} onChange={clickCategory} />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              )
            })) : <h4>لا يوجد تصنيفات</h4>
          }
          {showNext &&
            category.slice(6).map((item, index) => {
              return (
                <div className="d-flex mt-2" key={index + 6}>
                  <input type="checkbox" value={item._id} onChange={clickCategory} />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              )
            }

            )}
          <button onClick={toggleShowNext}>
            {showNext ? "Hide" : "Show"} next
          </button>

        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">الماركة</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="0" onChange={clickBrand} />
            <div className="filter-sub me-2 ">الكل</div>
          </div>
          {
            brand ? (brand.map((item, index) => {
              return (
                <div className="d-flex mt-2" key={index}>
                  <input type="checkbox" value={item._id} onChange={clickBrand} />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              )
            })) : <h4>لا يوجد ماركات</h4>
          }


        </div>

        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
            value={localFrom}
            onChange={priceFrom}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            value={localTo}
            onChange={priceTo}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
      </Row>
    </div>
  )
}

export default SideFilter
