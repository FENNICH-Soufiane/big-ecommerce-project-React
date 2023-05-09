import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../redux/actions/orderAction"

const UserGetAllArderHook = () => {
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState(true)
  const [paginate, setPaginate] = useState({})
  const [orderData, setOrderData] = useState([])
  const dispatch = useDispatch()


  const user = JSON.parse(localStorage.getItem('user'))
  let userName = ''
  if (user !== null)
    userName = user.name

  const get = async () => {
    setLoading(true)
    await dispatch(getAllOrders('', 4))
    setLoading(false)
  }

  useEffect(() => {
    get()
  }, [])

  const resAllOrder = useSelector(state => state.orderReducer.getAllOrders)

  const onPress = async (page) => {
    setLoading(true)
    await dispatch(getAllOrders(page, 4))
    setLoading(false)
  }
  useEffect(() => {
    if (loading === false) {
      // console.log(resAllOrder)
      if (resAllOrder.results) {
        setResults(resAllOrder.results)
      }
      if (resAllOrder.paginationResult) {
        setPaginate(resAllOrder.paginationResult)
      }
      if (resAllOrder.data) {
        setOrderData(resAllOrder.data)
      }

    }
  }, [loading])

  return [userName, results, paginate, orderData, onPress]

}

export default UserGetAllArderHook