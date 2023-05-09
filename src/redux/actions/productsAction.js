import { CREATE_PRODUCTS, GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS, GET_ERROR, GET_BRAND_LIKE, DELETE_PRODUCT, UPDATE_PRODUCT, GET_ALL_PRODUCTS_CATEGORY, GET_ALL_PRODUCTS_BRAND } from '../type'
import { useInsertDataWithImage } from '../../hooks/useInsertData'
import { useGetData } from '../../hooks/useGetData'
import useDeleteData from '../../hooks/useDeleteData'
import { useInsUpdateDataWithImage } from '../../hooks/useUpdateData'

export const createProduct = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/products`, formData)
    dispatch({
      type: CREATE_PRODUCTS,
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

// get all product with pagination
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?limit=${limit}`)
    dispatch({
      type: GET_ALL_PRODUCTS,
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

// get all product by Category
export const getAllProductsByCategory = (page, limit, categoryID) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?limit=${limit}&page=${page}&category=${categoryID}`)
    dispatch({
      type: GET_ALL_PRODUCTS_CATEGORY,
      payload: response,
      loading: true
    })
  }
  catch (e) {
    dispatch({
      type: GET_ALL_PRODUCTS_CATEGORY,
      payload: e.response
    })
  }
}

// get all product by Brand
export const getAllProductsByBrand = (page, limit, brandID) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?limit=${limit}&page=${page}&brand=${brandID}`)
    dispatch({
      type: GET_ALL_PRODUCTS_BRAND,
      payload: response,
      loading: true
    })
  }
  catch (e) {
    dispatch({
      type: GET_ALL_PRODUCTS_BRAND,
      payload: e.response
    })
  }
}

// get all product with pagination with page number (first appearance)
export const getAllProductsPage = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?page=${page}&limit=${limit}`)
    dispatch({
      type: GET_ALL_PRODUCTS,
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

// get all product with query string
export const getAllProductsSearch = (queryString) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?${queryString}`)
    dispatch({
      type: GET_ALL_PRODUCTS,
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

// get one product
export const getOneProducts = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products/${id}`)
    dispatch({
      type: GET_PRODUCT_DETAILS,
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

// methode for get product that have the same brand id
export const getBrandLike = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?brand=${id}`)
    dispatch({
      type: GET_BRAND_LIKE,
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

// delete product based on id
export const deleteProducts = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`)
    dispatch({
      type: DELETE_PRODUCT,
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

// update product based on id
export const updateProducts = (id, data) => async (dispatch) => {
  try {
    const response = await useInsUpdateDataWithImage(`/api/v1/products/${id}`, data)
    dispatch({
      type: UPDATE_PRODUCT,
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
