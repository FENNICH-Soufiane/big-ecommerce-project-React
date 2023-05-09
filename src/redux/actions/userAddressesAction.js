
import { ADD_USER_ADDRESS, GET_ALL_USER_ADDRESS, DELETE_USER_ADDRESS } from '../type'
import { useInsertData } from '../../hooks/useInsertData'
import { useGetDataToken } from '../../hooks/useGetData'
import useDeleteData from '../../hooks/useDeleteData'

// add user Address
export const addUserAddress = (body) => async (dispatch) => {
  try {
    const response = await useInsertData('/api/v1/addresses', body)
    console.log(response)
    dispatch({
      type: ADD_USER_ADDRESS,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: ADD_USER_ADDRESS,
      payload: e.response
    })
  }
}
// get all user addresses
export const getAllUserAddress = () => async (dispatch) => {
  try {
    const response = await useGetDataToken('/api/v1/addresses')
    dispatch({
      type: GET_ALL_USER_ADDRESS,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ALL_USER_ADDRESS,
      payload: e.response
    })
  }
}
// delete one user addresses
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/addresses/${id}`)
    dispatch({
      type: DELETE_USER_ADDRESS,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: DELETE_USER_ADDRESS,
      payload: e.response
    })
  }
}