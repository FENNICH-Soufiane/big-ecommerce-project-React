import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProducts, getAllProducts, getAllProductsPage } from '../../redux/actions/productsAction'

const ViewProductAdminHook = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // 10 pour afficher que 10 products
    // when first load show 10 products
    dispatch(getAllProducts(2))
  }, [])

  const allProducts = useSelector(state => state.allProducts.allProducts)
  let items = []
  let pagination = []
  try {
    if (allProducts) {
      // if (allProducts.data) {
      items = allProducts
      // }
    }

    if (allProducts) {
      // if (allProducts.paginationResult) {
      pagination = allProducts
    }
    // else pagination = []
    // }
  } catch (e) {
    console.log(e)
  }


  // when press on the next page
  const onPress = async (page) => {
    await dispatch(getAllProductsPage(page, 8))
  }


  return [items, pagination, onPress]
}

export default ViewProductAdminHook