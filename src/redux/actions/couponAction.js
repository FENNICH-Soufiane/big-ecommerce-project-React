import { useInsertData } from '../../hooks/useInsertData';
import { useGetDataToken } from '../../hooks/useGetData';
import { ADD_COUPON, GET_ALL_COUPON, DELETE_COUPON, GET_ONE_COUPON, EDIT_COUPON } from '../type'
import useDeleteData from '../../hooks/useDeleteData';
import { useInsUpdateData } from '../../hooks/useUpdateData';

// add coupon
export const addCoupon = (body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/coupons`, body);
    dispatch({
      type: ADD_COUPON,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: ADD_COUPON,
      payload: e.response
    })
  }
}
// get all coupon
export const getAllCoupon = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/coupons`);
    dispatch({
      type: GET_ALL_COUPON,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ALL_COUPON,
      payload: e.response
    })
  }
}
// delete coupon
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/coupons/${id}`);
    dispatch({
      type: DELETE_COUPON,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: DELETE_COUPON,
      payload: e.response
    })
  }
}
// get specific (one) coupon
export const getOneCoupon = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/coupons/${id}`);
    dispatch({
      type: GET_ONE_COUPON,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ONE_COUPON,
      payload: e.response
    })
  }
}
// update specific (one) coupon
export const editCoupon = (id, body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/coupons/${id}`, body);
    // console.log(response)
    dispatch({
      type: EDIT_COUPON,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: EDIT_COUPON,
      payload: e.response
    })
  }
}