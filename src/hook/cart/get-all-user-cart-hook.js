import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUserCartItems } from "../../redux/actions/cartAction"


const GetAllUserCartHook = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [itemNum, setItemNum] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [totalCartPriceAfterDiscout, setTotalCartPriceAfterDiscout] = useState(0)
  const [inthePLaceOfCoupon, setInthePLACEOFCoupon] = useState('')
  const [cartID, setCartID] = useState('0')
  useEffect(() => {
    const get = async () => {
      setLoading(true)
      await dispatch(getAllUserCartItems())
      setLoading(false)
    }
    get()
  }, [])

  const res = useSelector(state => state.cartReducer.getAllUserCart)

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 'success') {
        setItemNum(res.numOfCartItems)
        setCartItems(res.data.cartItems)
        setTotalCartPrice(res.data.totalCartPrice)
        setCartID(res.data._id)

        if(res.data.totalPriceAfterDiscount) {
          setTotalCartPriceAfterDiscout(res.data.totalPriceAfterDiscount)
          console.log(res.data.totalPriceAfterDiscount)
        } else {
          setTotalCartPriceAfterDiscout(0)
        }
        if(res.status === 'success') {
          setInthePLACEOFCoupon(res.status)
        } else {
          setInthePLACEOFCoupon('')
        }
      } 
      else {
        setItemNum(0)
        setCartItems([])
        setTotalCartPrice(0)
        setTotalCartPriceAfterDiscout('')
        setInthePLACEOFCoupon('')
        setCartID('0')
      }
    }
  }, [loading])

  return [cartID, itemNum, cartItems, totalCartPrice, totalCartPriceAfterDiscout, inthePLaceOfCoupon]
}

export default GetAllUserCartHook