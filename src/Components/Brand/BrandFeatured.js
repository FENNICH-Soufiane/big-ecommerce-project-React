import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import SubTiltle from '../Uitily/SubTiltle'
import BrandCard from './BrandCard'


import HomeBrandHook from '../../hook/brand/home-brand-hook';

const BrandFeatured = ({ title, btntitle, title_ }) => {

  const [brand, loading] = HomeBrandHook()
  // console.log(brand.data)
  // console.log(loading)

  return (
    <Container>

      <div>
        <SubTiltle title={title} btntitle={btntitle} pathText="/allbrand" />
        <Row className='my-1 d-flex justify-content-start'>
          {
            loading === false ?
              (brand && brand.data ? (brand.data.slice(0, 5).map((item, index) => {
                return (<BrandCard key={index} id={item._id} img={item.image} title_={item.name} />)
              }
              ))

                : (<h1>لا يوجد ماركات</h1>)
              )
              : (<Spinner animation="border" variant="danger" />)
          }

        </Row>
      </div>


    </Container>
  )
}

export default BrandFeatured
