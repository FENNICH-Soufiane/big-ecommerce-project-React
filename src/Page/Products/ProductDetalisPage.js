import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import ProductDetalis from '../../Components/Products/ProductDetalis'
import RateContainer from '../../Components/Rate/RateContainer'
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import ViewProductsDetailsHook from '../../hook/products/view-products-details-hook'
import { getBrandLike } from '../../redux/actions/productsAction'

const ProductDetalisPage = () => {
  // quand on click sur une card un produit afficher l'id
  // const {id} = useParams()
  // console.log(id)

  const {id} = useParams()
  const [item, images, name, brand, brandLikeData] = ViewProductsDetailsHook(id)
  
  if (item) {
    var rateAvg = item.ratingsAverage
    var rateQty = item.ratingsQuantity
  }

  // pour afficher que 4 elements dans la page
  // cette manipulation se trouve deja au niveau de ViewProductsDetailsHook
  // pour l'executer au niveau de cette page on doit enlever slice de ViewProductsDetailsHook 
  // et mettre  
  // if (brandLikeData) {
  //   var data = brandLikeData.data.slice(0, 4)
  // }
  // ensuite remplacer products={brandLikeData} par products={data}
  
  return (
    <div style={{ minHeight: '670px' }}>
      <CategoryHeader />
      <Container>
        <ProductDetalis />
        <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
        <CardProductsContainer products={brandLikeData} title="منتجات قد تعجبك" />
      </Container>
    </div>
  )
}

export default ProductDetalisPage
