import useDeleteData from '../../hooks/useDeleteData'
import { useInsertData } from '../../hooks/useInsertData'
import { useGetDataToken } from '../../hooks/useGetData'
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, USER_WISHLIST } from '../type'

// add product to wishlist
export const addProductToWishlist = (body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/wishlist`, body)
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: response,
      loading: true
    })
  }
  catch (e) {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: e.response
    })
  }
}

// remove product to wishlist
export const removeProductToWishlist = (prodID) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/wishlist/${prodID}`)
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: response,
      loading: true
    })
  }
  catch (e) {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: e.response
    })
  }
}

// get wishlist product
export const getProductWishlist = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/wishlist`)
    dispatch({
      type: USER_WISHLIST,
      payload: response,
      loading: true
    })
  }
  catch (e) {
    dispatch({
      type: USER_WISHLIST,
      payload: "Error " + e
    })
  }
}
