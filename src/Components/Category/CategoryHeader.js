import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AllCategoryPageHook from '../../hook/category/all-category-page-hook'
import { Link } from 'react-router-dom'

const CategoryHeader = () => {

  const [category, loading, pageCount, getPage] = AllCategoryPageHook()
  
  return (
    <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">

            {
              category ? (
                category.data ? (category.data.slice(0, 6).map((item, index) => {
                  return (
                    <Link to={`/products/category/${item._id}`} style={{ textDecoration: 'none' }}>
                      <div key={index} className="cat-text-header ">{item.name}</div>
                    </Link>
                  )
                })) : null
              ) :null
            }
            <Link to="/allcategory" style={{ textDecoration: 'none' }}>
              <div className="cat-text-header">المزيد</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CategoryHeader
