import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductWishlist } from '../../redux/actions/wishListAction'

const CardContainerHook = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [favProd, setFavProd] = useState([])
  
    const res = useSelector(state => state.wishListReducer.allWishList)
    useEffect(() => {
      const get = async () => {
        setLoading(true)
        await dispatch(getProductWishlist())
        setLoading(false)
      }
      get()
    }, [])
  
    useEffect(() => {
      if (loading === false) {
        if (res.data && res.data.length > 0) {
          setFavProd(res.data.map(item => item._id))
          console.log(res.data.map(item => item._id))
        } else {
          setFavProd([])
        }
      }
    }, [loading])

    return [favProd]
}

export default CardContainerHook