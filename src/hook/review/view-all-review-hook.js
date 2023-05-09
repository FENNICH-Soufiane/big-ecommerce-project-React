import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import notify from '../useNotification'
import { allReviewProduct } from '../../redux/actions/reviewAction'

const ViewAllReviewHook = (id) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const allReview = useSelector(state => state.reviewReducer.allReviewProduct)
  // if (allReview)
  //   console.log(allReview)

  useEffect(() => {
    setLoading(true)
    dispatch(allReviewProduct(id, 1, 2))
    setLoading(false)
  }, [])

  const onPress = async (page) => {
    await dispatch(allReviewProduct(id, page, 2))
  }

  return [allReview, onPress]
}

export default ViewAllReviewHook