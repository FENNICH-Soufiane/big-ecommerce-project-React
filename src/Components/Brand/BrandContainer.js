import React from 'react'
import BrandCard from './BrandCard'
import brand1 from "../../images/brand1.png";
import { Container, Row, Spinner } from 'react-bootstrap';


const BrandContainer = ({ loading, data }) => {

  

  return (
    <Container>
      <div className="admin-content-text mt-2 ">كل الماركات</div>
      <Row className='my-1 d-flex justify-content-start'>
        {
          loading === false ?
            (
              data ?
                (data.map((item, index) => { return (<BrandCard key={index} id={item._id} img={item.image} title_={item.name} />) }))
                : (<h3>لا يوجد مركات</h3>)
            )
            : (<Spinner animation="border" variant="success" />)
        }
      </Row>
    </Container>
  )
}

export default BrandContainer
