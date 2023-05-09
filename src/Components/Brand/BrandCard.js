import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BrandCard = ({ img, title_, id }) => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-2 d-flex justify-content-center">
      <Card
        className="my-1"
        style={{
          width: "100%",
          // height: "151px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#e6e6fa",
        }}>
          <Link to={`/products/brand/${id}`}>
        <Card.Img style={{ width: "100%", height: "151px" }} src={img} />
          </Link>
        <Card.Body>
          <Card.Title>{title_}</Card.Title>
        </Card.Body>

      </Card>
    </Col>
  )
}

export default BrandCard
