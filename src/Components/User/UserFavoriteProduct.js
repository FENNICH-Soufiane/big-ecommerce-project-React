import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import ProductCard from './../Products/ProductCard';
import Pagination from '../Uitily/Pagination'
import CardProductsContainer from '../Products/CardProductsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishlist } from '../../redux/actions/wishListAction';

const UserFavoriteProduct = () => {
  
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    const get = async () => {
    setLoading(true)
    await dispatch(getProductWishlist())
    setLoading(false)
    }
    get()
  }, [])

  const res = useSelector(state => state.wishListReducer.allWishList)

  useEffect(() => {
    if(loading === false) {
      if(res) {
        setItems(res.data)
      }
    }
  }, [loading])
  console.log(res)

  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row className='justify-content-start'>        
      {
        items.length <1 ? (<h4>لا توجد منتجات مفضلة</h4>) : (<CardProductsContainer products={items} title="" btntitle="" />)
      }
        
      </Row>
      {/* <Pagination /> */}
    </div>
  )
}

export default UserFavoriteProduct
