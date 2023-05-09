import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOrderCard } from "../../redux/actions/checkoutAction"
import GetAllUserCartHook from "../cart/get-all-user-cart-hook"
import notify from "../useNotification"


const OrderPayCardHook = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [cartID, , , , ,] = GetAllUserCartHook()

  // when user click pay with card
  const handleCreateOrderCard = async () => {
    if (cartID === '0') {
      notify('من فضلك اضف منتجات للعربة', 'warn')
      return
    }
    setLoading(true)
    await dispatch(createOrderCard(cartID, {
      shippingAddress: {
        details: "address 2",
        phone: "333333",
        city: "cairo",
        postalCode: "12121"
      }
    }
    ))
    setLoading(false)
  }

  const resOrderCard = useSelector(state => state.checkoutReducer.createOrderCard)
  useEffect(() => {
    if(loading === false) {
      if(resOrderCard && resOrderCard.status === "success") {
        notify('تم انشاء الطلب بنجاح', 'success')
        if(resOrderCard.session.url) {
          // console.log(resOrderCard.session.url)
          window.open(resOrderCard.session.url)
        }
      }
      else {
        notify('فشل في اكمال الطلب حاول مرة اخرى', 'warn')
      }
    }
  }, [loading])

  return [handleCreateOrderCard]
}

export default OrderPayCardHook