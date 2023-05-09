import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllCartItems, deleteCartItems } from '../../redux/actions/cartAction'
import notify from '../useNotification'

const DeleteCartHook = (item) => {
  // delete all cart in once time
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const handelDeleteCart =async () => {
    setLoading(true)
    await dispatch(clearAllCartItems())
    setLoading(false)
  }
  const res = useSelector(state => state.cartReducer.clearCartItems)
  useEffect(() => {
    if(loading === false ) {
      if(res === "") {
        notify('تم الحذف بنجاح', 'success')
        setTimeout(() => {
          window.location.reload(false)
        }, 1000);
      }
    }
  }, [loading])

  // delete a specific cart item
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handelShow = () => setShow(true)

  const handelDeleteItem =async () => {
    await dispatch(deleteCartItems(item._id))
    setShow(false)
    window.location.reload(false)
  } 
  return [handelDeleteCart, show, handleClose, handelShow, handelDeleteItem]
}

export default DeleteCartHook