import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAddress } from '../../redux/actions/userAddressesAction';
import notify from '../../hook/useNotification'

const DeleteAddressHook = (id) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // method for delete coupon
  const handelDelete = async () => {
    setLoading(true)
    await dispatch(deleteUserAddress(id))

    setShow(false)
    setLoading(false)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
  const res = useSelector(state => state.userAddressesReducer.deleteAddresses)

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 'success') {
        console.log(res)
        notify('تمت عملية الحذف بنجاح', 'success')

      } else {
        notify('هناك مشكلة في عملية الحذف', 'warn')
      }
    }
  }, [loading])

  return [show, handleClose, handleShow, handelDelete]
}

export default DeleteAddressHook