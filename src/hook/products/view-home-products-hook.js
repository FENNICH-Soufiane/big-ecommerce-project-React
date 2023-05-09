import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions/productsAction'

const ViewHomeProductsHook = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const allproducts = useSelector(state => state.allProducts.allProducts)

  let items = []
  if (allproducts) {
    if (allproducts.data) {
      items = allproducts.data.slice(0, 4)
      console.log(items)
    }
  }
  else {
    items = []
  }

  return [items]
}

export default ViewHomeProductsHook