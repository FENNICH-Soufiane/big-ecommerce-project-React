import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserAddressCard from './UserAddressCard'
import ViewAddressesHook from '../../hook/user/view-addresses-hook'

const UserAllAddress = () => {
  const [res] = ViewAddressesHook()

  return (
    <div>
      <div className="admin-content-text pb-4">دفتر العنوانين</div>
      {
        res && res.data ? (res.data.map((item, index) => {
          return (
            <UserAddressCard key={index} item={item} />
          )
        })) : <h4>لا يوجد عناوين حتى الان</h4>
      }


      <Row className="justify-content-center">
        <Col sm="5" className="d-flex justify-content-center">
          <Link to="/user/add-address" style={{ textDecoration: "none" }}>
            <button className="btn-add-address">اضافه عنوان جديد</button>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default UserAllAddress
