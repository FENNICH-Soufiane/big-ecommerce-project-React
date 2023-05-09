import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrand } from '../../redux/actions/brandAction'
import { getAllCategory } from '../../redux/actions/categoryAction'
import ViewSearchProductsHook from '../products/view-search-products-hook'

const SidebarSearchHook = () => {

  const [items, pagination, onPress, getProduct] = ViewSearchProductsHook()

  const dispatch = useDispatch()
  // when first load
  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCategory())
      await dispatch(getAllBrand())
    }
    get()
  }, [])
  // to get state from redux
  const allCat = useSelector(state => state.allCategory.category)
  const allBrand = useSelector(state => state.allBrand.brand)

  // to get category
  let category = [];
  if (allCat.data)
    category = allCat.data

  // to get brand
  let brand = [];
  if (allBrand.data)
    brand = allBrand.data


  const [catChecked, setCatChecked] = useState([])

  // when user press any category
  const clickCategory = (e) => {

    let value = e.target.value

    if (value === "0") {
      setCatChecked([])
    }
    else {
      if (e.target.checked === true) {
        setCatChecked([...catChecked, value])
      }
      else if (e.target.checked === false) {
        const newArray = catChecked.filter((e) => e !== value)
        setCatChecked(newArray)
      }
    }

  }
  var queryCat = ""
  useEffect(() => {
    queryCat = catChecked.map(val => 'category=' + val).join('&')
    localStorage.setItem('catCheck', queryCat)
    // console.log(catChecked)
    // console.log(queryCat)

    setTimeout(() => {
      getProduct()
    }, 1000);
  }, [catChecked])



  // for test selected field
  // console.log(catChecked) 
  // console.log(queryCat)

  const [brandChecked, setBrandChecked] = useState([])
  var queryBrand = ""
  // when user press any brand
  const clickBrand = (e) => {

    let value = e.target.value

    if (value === "0") {
      setBrandChecked([])
    }
    else {
      if (e.target.checked === true) {
        setBrandChecked([...brandChecked, value])
      }
      else if (e.target.checked === false) {
        const newArray = brandChecked.filter(item => item !== value)
        setBrandChecked(newArray)
      }
    }
  }
  var queryBrand = ""
  useEffect(() => {
    queryBrand = brandChecked.map(val => 'brand=' + val).join('&')
    localStorage.setItem('brandCheck', queryBrand)
    // console.log(catChecked)
    // console.log(queryCat)

    setTimeout(() => {
      getProduct()
    }, 1000);
  }, [brandChecked])

  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  const priceFrom = (e) => {
    localStorage.setItem('priceFrom', e.target.value)
    setFrom(e.target.value)
  }
  const priceTo = (e) => {
    localStorage.setItem('priceTo', e.target.value)
    setTo(e.target.value)
  }
  useEffect(() => {
    setTimeout(() => {
      getProduct()
    }, 1000)
  }, [from, to])



  return [category, brand, clickCategory, clickBrand, priceFrom, priceTo]
}

export default SidebarSearchHook




