import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import GetAllUserCartHook from "../cart/get-all-user-cart-hook";
import notify from "../useNotification";
import { createOrderCash } from "../../redux/actions/checkoutAction";

const OrderPayCashHook = () => {

  const [cartID, , , , ,] = GetAllUserCartHook()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [addressDetalis, setAddressDetalis] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(true);

  // when change or choose address by user
  const handleChooseAddress = async (e) => {
    console.log(e.target.value)
    get()
  }
  const get = async () => {
    setLoading(true)
    await dispatch()
    setLoading(false)
  }
  
  // when user click pay
  const handleCreateOrderCash = async () => {
    if (cartID === '0') {
      notify('من فضلك اضف منتجات للعربة', 'warn')
      return
    }
    setLoadingCreate(true)
    await dispatch(createOrderCash(cartID, {
      shippingAddress: {
        details: "address 2",
        phone: "333333",
        city: "cairo",
        postalCode: "12121"
      }
    }
    ))
    setLoadingCreate(false)
  }

  // get reposnse for create order cash
  const resOrderCash = useSelector(state => state.checkoutReducer.createOrderCash)

  useEffect(() => {
    if (loadingCreate === false) {
      if (resOrderCash && resOrderCash.status === 201) {
        notify("تم انشاء طلبك بنجاح", "success")
        setTimeout(() => {
          navigate('/user/allorders')
        }, 1500);
      } else {
        notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
      }
    }
  }, [loadingCreate])

  return [handleChooseAddress, handleCreateOrderCash]
}

export default OrderPayCashHook