import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeOrderDeliver, changeOrderPay } from "../../redux/actions/orderAction"
import notify from "../useNotification"


const ChangeOrderStatusHook = (id) => {
  const [loadingPay, setLoadingPay] = useState(true)
  const [loadingDeliver, setLoadingDeliver] = useState(true)
  const [pay, setPay] = useState(0)
  const [deliver, setDeliver] = useState(0)
  const dispatch = useDispatch()

  //Code pour le paiment
  const onChangePaid = (e) => {
    setPay(e.target.value)
  }
  
  const changePayOrder = async () => {
    if(pay === 'true') {
      setLoadingPay(true)
      await dispatch(changeOrderPay(id))
      setLoadingPay(false)
    } else if (pay === '0') {
      notify('من فضلك اختر قيمة', 'warn')
    }
  }  

  const resStatusPay = useSelector(state => state.orderReducer.changePay)

  useEffect(() => {
    if(loadingPay === false) {
      console.log(resStatusPay)
      if(resStatusPay && resStatusPay.status === 200) {
        notify('تم تغيير الحالة الدفع بنجاح', 'success')
        setTimeout(() => {
          window.location.reload(false)
        }, 1000)
      } else {
        notify('هناك مشكلة في عملية التغيير', 'warn')
      }
    }
  }, [loadingPay])

  // Code pour la livraison
  const onChangeDeliver =(e) => {
    setDeliver(e.target.value)
  }
  
 const changeDeliverOrder = async () => {
  console.log(deliver)
    if(deliver === 'true') {
      setLoadingDeliver(true)
      await dispatch(changeOrderDeliver(id))
      setLoadingDeliver(false)
    } else if (pay === '0') {
      notify('من فضلك اختر قيمة', 'warn')
    }
  }  

  const resStatusDeliver = useSelector(state => state.orderReducer.changeDeliver)

  useEffect(() => {
    if(loadingDeliver === false) {
      console.log(resStatusDeliver)
      if(resStatusDeliver && resStatusDeliver.status === 200) {
        notify('تم تغيير الحالة التوصيل بنجاح', 'success')
        setTimeout(() => {
          window.location.reload(false)
        }, 1000)
      } else {
        notify('هناك مشكلة في عملية التغيير', 'warn')
      }
    }
  }, [loadingDeliver])


  return [onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder]
}
export default ChangeOrderStatusHook