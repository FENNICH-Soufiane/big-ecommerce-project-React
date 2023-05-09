import useDeleteData from '../../hooks/useDeleteData'
import { useGetDataToken } from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData'
import { useInsUpdateData } from '../../hooks/useUpdateData'
import { ADD_TO_CART, GET_ALL_USER_CART, CLEAR_ALL_USER_CART, DELETE_CART_FROM_ITEM, UPDATE_QUANTITY_OF_PRODUCT_IN_CART, APPLAY_COUPON_CART } from '../type'

// add product to cart for shopping
export const addProductToCart = (body) => async (dispatch) => {
  try {
    const response = await useInsertData('/api/v1/cart', body)

    dispatch({
      type: ADD_TO_CART,
      payload: response
    })
  } catch (e) {
    dispatch({
      type: ADD_TO_CART,
      payload: e.response
    })
  }
}

// get all cart item
export const getAllUserCartItems = () => async (dispatch) => {
  try {
    const response = await useGetDataToken('/api/v1/cart')

    dispatch({
      type: GET_ALL_USER_CART,
      payload: response
    })
  } catch (e) {
    dispatch({
      type: GET_ALL_USER_CART,
      payload: e.response
    })
  }
}
// clear all cart item
export const clearAllCartItems = () => async (dispatch) => {
  try {
    const response = await useDeleteData('/api/v1/cart')

    dispatch({
      type: CLEAR_ALL_USER_CART,
      payload: response
    })
  } catch (e) {
    dispatch({
      type: CLEAR_ALL_USER_CART,
      payload: e.response
    })
  }
}
// delete a specific cart item
export const deleteCartItems = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart/${id}`)

    dispatch({
      type: DELETE_CART_FROM_ITEM,
      payload: response
    })
  } catch (e) {
    dispatch({
      type: DELETE_CART_FROM_ITEM,
      payload: e.response
    })
  }
}
// update quantity of product in cart
export const updateQuantityCartItem = (id, body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/cart/${id}`, body)

    dispatch({
      type: UPDATE_QUANTITY_OF_PRODUCT_IN_CART,
      payload: response
    })
  } catch (e) {
    dispatch({
      type: UPDATE_QUANTITY_OF_PRODUCT_IN_CART,
      payload: e.response
    })
  }
}

// applay coupon on cart item
export const applyCouponCart = (body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/cart/applyCoupon`, body)

    // console.log(response)

    dispatch({
      type: APPLAY_COUPON_CART,
      payload: response
    })
  } catch (e) {
    dispatch({
      type: APPLAY_COUPON_CART,
      payload: e.response
    })
  }
}