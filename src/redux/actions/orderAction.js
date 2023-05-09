import { useGetDataToken } from "../../hooks/useGetData"
import { useInsUpdateData } from "../../hooks/useUpdateData"
import { GET_ALL_ORDER, GET_ONE_ORDER,UPDATE_ORDER_PAY, UPDATE_ORDER_DELIVER } from "../type"

export const getAllOrders = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders?limit=${limit}&page=${page}`)
    dispatch({
      type: GET_ALL_ORDER,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ALL_ORDER,
      payload: e.message
    })
  }
}

export const getOneOrder = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders/${id}`)
    dispatch({
      type: GET_ONE_ORDER,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ONE_ORDER,
      payload: e.message
    })
  }
}

export const changeOrderPay = (id) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/orders/${id}/pay`)
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: e.message
    })
  }
}

export const changeOrderDeliver = (id) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/orders/${id}/deliver`)
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: e.message
    })
  }
}