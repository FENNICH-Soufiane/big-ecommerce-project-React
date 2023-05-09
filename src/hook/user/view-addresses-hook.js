import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAddress } from '../../redux/actions/userAddressesAction'

const ViewAddressesHook = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const get = async () => {
      setLoading(true)
      dispatch(getAllUserAddress())
      setLoading(true)
    }
    get()
  }, [])

  const res = useSelector(state => state.userAddressesReducer.allAddresses)
  
  useEffect(() => {
    if(loading ===  false) {
      
    }
  }, [loading])

  return [res]
}

export default ViewAddressesHook