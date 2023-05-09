import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'

import CategoryCard from './../Category/CategoryCard';


const CategoryContainer = ({loading, category}) => {

  

  const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#d6d600", "#e47269", "#ff0000"]

  return (
    <Container >
      <div className="admin-content-text mt-2 ">كل التصنيفات</div>
      <Row className='my-2 d-flex justify-content-start'>
        {
          loading === false
            ? (category ? (
            category.map((item, index) => {
              return(<CategoryCard key={index} id={item._id} title={item.name} img={item.image} background={colors[Math.floor(Math.random() * 6)]} />)
            }))
              : (<h1>لا يوجد منتجات</h1>)
            )
            : (<h1>جاري التحميل</h1>)
        }


      </Row>
    </Container>
  )
}

export default CategoryContainer
