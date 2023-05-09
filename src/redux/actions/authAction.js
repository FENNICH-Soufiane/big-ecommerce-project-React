import { CREATE_NEW_USER, LOGIN_USER, GET_CURRENT_USER, FORGET_PASSWORD, VERIFY_PASSWORD, RESET_PASSWORD, UPDATE_USER_PROFILE_DATA, UPDATE_USER_PASSWORD } from '../type'

import { useInsertData } from '../../hooks/useInsertData'
import { useGetDataToken } from '../../hooks/useGetData'
import { useInsUpdateData } from '../../hooks/useUpdateData';


//create new user 
export const createNewUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/signup`, data);
    dispatch({
      type: CREATE_NEW_USER,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: CREATE_NEW_USER,
      payload: e.response,
    })
  }
}

//login new user 
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/login`, data);
    dispatch({
      type: LOGIN_USER,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: LOGIN_USER,
      payload: e.response,
    })
  }
}

//login new user second method with different url
export const getLoggedUser = () => async (dispatch) => {
  try {
    const response = await useGetDataToken('/api/v1/users/getMe');
    dispatch({
      type: GET_CURRENT_USER,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: GET_CURRENT_USER,
      payload: e.response,
    })
  }
}

// forget Password
export const forgetPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData('/api/v1/auth/forgotPassword', data);
    dispatch({
      type: FORGET_PASSWORD,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: FORGET_PASSWORD,
      payload: e.response,
    })
  }
}

// verify code send in gmail for reset password
export const verifyPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData('/api/v1/auth/verifyResetCode', data);
    dispatch({
      type: VERIFY_PASSWORD,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: VERIFY_PASSWORD,
      payload: e.response,
    })
  }
}

// reset password and create a new password
export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsUpdateData('/api/v1/auth/resetPassword', data);
    dispatch({
      type: RESET_PASSWORD,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: RESET_PASSWORD,
      payload: e.response,
    })
  }
}

// update user data
export const updateUserProfileData = (body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData('/api/v1/users/updateMe', body);
    dispatch({
      type: UPDATE_USER_PROFILE_DATA,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: UPDATE_USER_PROFILE_DATA,
      payload: e.response,
    })
  }
}
// update user password
export const updateUserPassword = (body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData('/api/v1/users/changeMyPassword', body);
    console.log(response)
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: response,
      loading: true
    })

  } catch (e) {
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: e.response,
    })
  }
}
