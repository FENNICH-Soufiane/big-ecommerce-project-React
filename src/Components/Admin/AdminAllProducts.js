import React from 'react'
import { Row, Spinner } from 'react-bootstrap'
import AdminAllProductsCard from './AdminAllProductsCard'

const AdminAllProducts = ({ products }) => {
  return (
    <div>
      <div className='admin-content-text'>ادارة جميع المنتجات</div>
      <Row className='justify-content-start'>
        {
          products ? (products.map((item, index) =><AdminAllProductsCard key={index} item={item}/>)) 
          : <Spinner animation="border" />
        }
        
      </Row>

    </div>
  )
}

export default AdminAllProducts
