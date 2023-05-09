import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBrandLike, getOneProducts } from '../../redux/actions/productsAction'

import mobile from '../../images/mobile.png'
import { getOneCategory } from '../../redux/actions/categoryAction'
import { getOneBrand } from '../../redux/actions/brandAction'

const ViewProductsDetailsHook = (prodID) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneProducts(prodID))
  }, [])

  const oneProduct = useSelector(state => state.allProducts.oneProduct)
  const oneCategory = useSelector(state => state.allCategory.oneCategory)
  const oneBrand = useSelector(state => state.allBrand.oneBrand)
  const brandLike = useSelector(state => state.allProducts.brandLike)

  // to show products item
  let item = []
  if (oneProduct.data) {
    item = oneProduct.data
  } else {
    item = []
  }
  // to view images gallery
  let images = []
  if (item) {
    if (item.images) {
      if (item.images.length > 0) {
        images = item.images.map((img) => { return { original: img } })
      }

      else {
        images = [
          {
            original: `${mobile}`,
          },
          {
            original: `${mobile}`,
          },
          {
            original: `${mobile}`,
          },
        ]
      }
    }
  }


  useEffect(() => {
    if (item) {
      if (item.brand) {
        dispatch(getOneBrand(item.brand))
        // dispatch(getOneBrand('63a7597893053fc61f886059'))
      }
      if (item) {
        if (item.brand) {
          dispatch(getBrandLike(item.brand))
        }
      }
    }
  }, [item])


  // to show category name
  let name = ''
  if (item) {
    if (item.category) {
      if (item.category.name) {
        name = item.category.name
      }
    }
  }

  // to show brand category
  let brand = []
  if (oneBrand) {
    if (oneBrand.data) {
      brand = oneBrand.data.name
    }
  }
  // afficher les produits de meme brand que le brand de produit en page (en question)
  let brandLikeData = []
  if (brandLike) {
    if (brandLike.data) {
      brandLikeData = brandLike.data.slice(0, 4)
      // console.log(brandLikeData)
    }
    else {
      brandLikeData = []
    }
  }







  return [item, images, name, brand, brandLikeData]

}

export default ViewProductsDetailsHook