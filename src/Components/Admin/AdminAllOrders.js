import React from 'react'
import { Row } from 'react-bootstrap'
import AdminAllOrdersItem from './AdminAllOrdersItem'
import UserGetAllArderHook from '../User/user-get-all-order-hook'
import Pagination from '../Uitily/Pagination'

const AdminAllOrders = () => {
  const [userName, results, paginate, orderData, onPress] = UserGetAllArderHook()
  return (
    <div>
      <div className='admin-content-text'>ادارة جميع الطلبات</div>
      <Row className='justify-content-start'>

        {
          orderData && orderData.length >= 1 ? (orderData.map((orderItem, index) => {
            return (
              <AdminAllOrdersItem orderItem={orderItem} key={index} />
            )
          })) : <h6>لا يوجد طلبات حتى الان</h6>
        }
        {
          paginate.numberOfPages >= 2 ? (<Pagination onPress={onPress} pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0} />)
            : null
        }


      </Row>
    </div>
  )
}

export default AdminAllOrders
