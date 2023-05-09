import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts, getAllProductsPage, getAllProductsSearch } from '../../redux/actions/productsAction'

const ViewSearchProductsHook = () => {

  let limit =8;
  const dispatch = useDispatch()

  let priceFromString = "", priceTo_String = ""
  // when want to search
  const getProduct = async () => {

    getStorage()
    // see sortData method at the end of the page 👇🏻
    sortData()
    await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&keyword=${word}&${queryCat}&${queryBrand}${priceFromString}${priceTo_String}`))
  }


  let word = "", queryCat = "", queryBrand = "", priceFrom = "", priceTo = ""
  
  const getStorage = () => {
    if (localStorage.getItem('searchWord') != null)
      word = localStorage.getItem('searchWord')
    if (localStorage.getItem('catCheck') != null)
      queryCat = localStorage.getItem('catCheck')
    if (localStorage.getItem('brandCheck') != null)
      queryBrand = localStorage.getItem('brandCheck')
    if (localStorage.getItem('priceFrom') != null)
      priceFrom = localStorage.getItem('priceFrom')
    if (localStorage.getItem('priceTo') != null)
      priceTo = localStorage.getItem('priceTo')
    // this condition for verify if $price[gt] and $price[lte] are empty or not because if they are empty the request does not return results
    if (priceFrom === "" || priceFrom <= 0) {
      priceFromString = ""
    }
    else {
      priceFromString = `&price[gt]=${priceFrom}`
    }
    if (priceTo === "" || priceTo <= 0) {
      priceTo_String = ""
    }
    else {
      priceTo_String = `&price[lte]=${priceTo}`
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  const allproducts = useSelector(state => state.allProducts.allProducts)

  let items = []
  try {
    if (allproducts) {
      if (allproducts.data) {
        items = allproducts.data
        // console.log(items.length)
      }
    }
    else {
      items = []
    }
  } catch (e) {
    console.log(e)
  }

  let pagination = []
  try {
    if (allproducts) {
      if (allproducts.paginationResult) {
        pagination = allproducts.paginationResult.numberOfPages
      } else {
        pagination = []
      }
    }
  } catch (e) {
    console.log(e)
  }

  // when press on pagination
  const onPress = async (page) => {
    getStorage()
    sortData()
    await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${queryBrand}${priceFromString}${priceTo_String}`))
  }

  // when user choose sort type
  let sortType = "", sort
  const sortData = () => {
    if (localStorage.getItem('sortType') !== null) {
      sortType = localStorage.getItem('sortType')
    } else {
      sortType = ""
    }

    if (sortType === "السعر من الاقل للاعلي") {
      sort = "+price"
    }
    else if (sortType === "السعر من الاعلي للاقل") {
      sort = "-price"
    }
    else if (sortType === "الاكثر مبيعا") {
      sort = "-sold"
    }
    else if (sortType === "الاعلي تقييما") {
      sort = "-ratingsQuantity"
    }
    else if (sortType === "") {
      sort = ""
    }

  }

  return [items, pagination, onPress, getProduct]
}

export default ViewSearchProductsHook