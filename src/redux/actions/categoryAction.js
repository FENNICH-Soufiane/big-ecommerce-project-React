import { GET_ALL_CATEGORY, GET_ERROR, CREATE_CATEGORY, GET_ONE_CATEGORY } from '../type'
// import baseUrl from "../../Api/baseURL"
import { useGetData } from '../../hooks/useGetData'
import { useInsertDataWithImage } from '../../hooks/useInsertData'

// method for get all categories
export const getAllCategory = (limit) => async (dispatch) => {
  try {
    // @desc On va remplacer baseUrl par hooks useGetData
    // const res = await baseUrl.get('/api/v1/categories')
    const response = await useGetData(`/api/v1/categories?limit=${limit}`)
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e
    })
  }
}

// method for get categorie based id (for product details)
export const getOneCategory = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/categories/${id}`)
    dispatch({
      type: GET_ONE_CATEGORY,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e
    })
  }
}


// when press pagination
export const getAllCategoryPage = (page) => async (dispatch) => {
  try {
    // @desc On va remplacer baseUrl par hooks useGetData
    // const res = await baseUrl.get('/api/v1/categories')
    const response = await useGetData(`/api/v1/categories?limit=6&page=${page}`)
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response
    })
  }
  catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e
    })
  }
}

export const createCategory = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/categories`, formData)
    dispatch({
      type: CREATE_CATEGORY,
      payload: response,
      loading: true
    })
  }
  catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e
    })
  }
}

