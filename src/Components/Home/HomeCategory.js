import React, { useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTiltle from '../Uitily/SubTiltle'
import CategoryCard from './../Category/CategoryCard';
import HomeCategoryHook from '../../hook/category/home-category-hook';


const HomeCategory = () => {

  const [category, loading, colors] = HomeCategoryHook()

  return (
    <Container>
      <SubTiltle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <Row className='my-2 d-flex justify-content-between'>
        {
          loading === false ? (
            category.data ?
              // slice(0, 5) c'est pour qu'afficher que 5 element dans le home
              category.data.slice(0, 5).map((item, index) => {
                return ((<CategoryCard key={index} id={item._id} title={item.name} img={item.image} background={colors[index]} />))
              })
              : (<h1>لا يوجد منتجات</h1>)
          ) :
            (
              <div className="position-relative">
                <Spinner className="position-absolute top-50 start-50 translate-middle" animation="grow" variant="dark" />
              </div>
            )
        }
      </Row>
    </Container>
  )
}

export default HomeCategory
