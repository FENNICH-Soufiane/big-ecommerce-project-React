import { CREATE_PRODUCTS, GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS, GET_ERROR, GET_BRAND_LIKE, DELETE_PRODUCT, UPDATE_PRODUCT, GET_ALL_PRODUCTS_CATEGORY, GET_ALL_PRODUCTS_BRAND } from '../type'

const initial = {
  products: [],
  allProducts: [],
  oneProduct: [],
  brandLike: [],
  deleteProduct: [],
  updateProducts: [],
  allProductByCat: [],
  allProductByBrand: [],
  loading: true
}

const productsReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      }
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false
      }
    case GET_PRODUCT_DETAILS:
      return {
        oneProduct: action.payload,
        loading: false
      }
    case GET_BRAND_LIKE:
      return {
        ...state,
        brandLike: action.payload,
        loading: false
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: action.payload,
        loading: false
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProducts: action.payload,
        loading: false
      }
    case GET_ALL_PRODUCTS_CATEGORY:
      return {
        ...state,
        allProductByCat: action.payload,
        loading: false
      }
    case GET_ALL_PRODUCTS_BRAND:
      return {
        ...state,
        allProductByBrand: action.payload,
        loading: false
      }

    case GET_ERROR:
      return {
        ...state,
        products: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default productsReducer