import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart } from "../../redux/actions/cartAction"
import notify from '../../hook/useNotification'


const AddToCartHook = (prodID, item) => {

  const dispatch = useDispatch()
  const [indexColor, setIndexColor] = useState('')
  const [colorText, setColorText] = useState('')
  const [loading, setLoading] = useState(true)

  const colorClick = (index, color) => {
    // setIndexColor est modifier la bordure du couleur choisi
    setIndexColor(index)
    // on recuper la couleur l'envoyer dans en tant que couleur choisi
    setColorText(color)
  }
  // add product to card
  const addToCartHandel = async () => {
    setLoading(true)
    console.log(item.colors)
    if (item.colors.length >= 1) {
      if(colorText === "") {
        notify('من فضلك اختر لون للمنتج', 'warn')
        return
      }
    } else {
      setColorText('')
    }
    await dispatch(addProductToCart({
      productId: prodID,
      color: colorText
    }))
    setLoading(false)
  }
  const res = useSelector(state => state.cartReducer.addToCart)
  useEffect(() => {
    if(loading === false) {
      if(res && res.status ===200 ) {
        notify('تمت اضافة المنتج للعربة بنجاح', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        notify('قم بتسجيل الدخول اولا', 'warn')
      }
    }
  }, [loading])

  return [indexColor, colorClick, addToCartHandel]
}

export default AddToCartHook