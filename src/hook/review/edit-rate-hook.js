import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import notify from '../useNotification'
import { createReview, deleteReviewOnProduct, updateReviewOnProduct } from '../../redux/actions/reviewAction'

const EditRateHook = (review) => {

  // console.log(review)

  const dispatch = useDispatch()

  const [isUser, setIsUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newRateText, setNewRateText] = useState(review.title)
  const [newRateValue, setNewRateValue] = useState(review.ratings)
  // console.log(review.ratings)
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handelShowEdit = () => setShowEdit(true)

  const onChangeRateText = (e) => {
    setNewRateText(e.target.value)
  }
  const onChangeRateValue = (val) => {
    setNewRateValue(val)
  }

  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (review.user._id === user._id) {
      setIsUser(true)
    }
  }, [])


  const handelEdit = async () => {
    setLoading(true)
    await dispatch(updateReviewOnProduct(review._id, {
      title: newRateText,
      ratings: newRateValue
    }))
    setLoading(false)
    handleCloseEdit()
  }
  const res = useSelector(state => state.reviewReducer.updateReview)

  useEffect(() => {
    if (loading === false) {
      console.log(res)
      if (res.status && res.status === 200) {
        notify('تم تعديل التقييم بنجاح', 'success')
        setTimeout(() => {
          window.location.reload(false)
        }, 500);
      }
      else {
        notify('هناك مشكلة في عملية التعديل', 'error')
      }
    }
  }, [loading])

  return [showEdit, handelShowEdit, handleCloseEdit, handelEdit, onChangeRateText, newRateText, onChangeRateValue, newRateValue]

}

export default EditRateHook