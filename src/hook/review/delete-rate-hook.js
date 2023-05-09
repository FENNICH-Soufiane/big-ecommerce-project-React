import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import notify from '../useNotification'
import { createReview, deleteReviewOnProduct } from '../../redux/actions/reviewAction'

const DeleteRateHook = (review) => {

  // console.log(review)

  const dispatch = useDispatch()

  const [isUser, setIsUser] = useState(false)
  const [loading, setLoading] = useState(true)

  const [showDelete, setShowDelete] = useState(false)
  const handleClose = () => setShowDelete(false)
  const handelShow = () => setShowDelete(true)

  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (review.user._id === user._id) {
      setIsUser(true)
    }
  }, [])


  const handelDelete = async () => {
    setLoading(true)
    await dispatch(deleteReviewOnProduct(review._id))
    setLoading(false)
    handleClose()
  }
  const res = useSelector(state => state.reviewReducer.deleteReview)

  useEffect(() => {
    if (loading === false) {
      if (res === "") {
        notify('تم حذف التقييم بنجاح', 'success')
        setTimeout(() => {
          window.location.reload(false)
        }, 500);
      }
      else {
        notify('هناك مشكلة في عملية المسح', 'error')
      }
    }
  }, [loading])

  return [isUser, handelDelete, handelShow, handleClose, showDelete]

}

export default DeleteRateHook