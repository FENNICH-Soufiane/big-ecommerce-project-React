import React from 'react'
import Pagination from '../../Components/Uitily/Pagination'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import { Col, Container, Row } from 'react-bootstrap'
import ViewSearchProductsHook from '../../hook/products/view-search-products-hook'
import { useParams } from 'react-router-dom'
import ViewAllProductsByCategory from '../../hook/products/view-all-products-by-category'

const ProductByCategory = () => {

  const {id} = useParams()
  const [items, pagination,onPress] = ViewAllProductsByCategory(id)
  if(pagination) var pageCount = pagination
  else pageCount = 0 
  // console.log(pagination)
  return (
    <div style={{ minHeight: '670px' }}>
      <Container>
        <Row className='d-flex flex-row'>
          <Col sm="12">
            <CardProductsContainer products={items} title="" btntitle="" />
          </Col>
        </Row>
        {
          pagination > 1 ? <Pagination pageCount={pageCount} onPress={onPress} /> : null
        }
      </Container>
    </div>
  )
}

export default ProductByCategory