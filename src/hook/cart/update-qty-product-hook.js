import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateQuantityCartItem } from "../../redux/actions/cartAction"


const UpdateQtyProductHook = (item) => {
  const dispatch = useDispatch()
  const [itemQuantity, setItemQuantity] = useState(item.quantity)

  const onChangeQuantity = (e) => {
    setItemQuantity(e.target.value)
  }

  const handleUpdateCart =async () => {
    await dispatch(updateQuantityCartItem(item._id, {
      quantity: itemQuantity
    }))
    window.location.reload()
  }
  
  return [itemQuantity, onChangeQuantity, handleUpdateCart]
}

export default UpdateQtyProductHook