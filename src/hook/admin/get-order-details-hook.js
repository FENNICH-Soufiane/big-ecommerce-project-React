import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneOrder } from "../../redux/actions/orderAction"


const GetOrderDetailsHook = (id) => {
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()

  const get = async () => {
    setLoading(true)
    await dispatch(getOneOrder(id))
    setLoading(false)
  }
  useEffect(() => {
    get()
  }, [])

  const resOneOrder = useSelector(state => state.orderReducer.getOneOrder)
  

  useEffect(() => {
    if (loading === false) {
      console.log(resOneOrder)
      if (resOneOrder) {
        setOrderData(resOneOrder.data)
        if (resOneOrder.data) {
          setCartItems(resOneOrder.data.cartItems)
        }


      }

    }
  }, [loading])

  return [orderData, cartItems]
}

export default GetOrderDetailsHook