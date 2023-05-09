import { ADD_TO_CART, GET_ALL_USER_CART, CLEAR_ALL_USER_CART, DELETE_CART_FROM_ITEM, UPDATE_QUANTITY_OF_PRODUCT_IN_CART, APPLAY_COUPON_CART } from '../type'

const initial = {
  addToCart: [],
  getAllUserCart: [],
  clearCartItems: [],
  deleteItem: [],
  updateQuantity: [],
  applayCoupon: []
}

const cartReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload
      }
    case GET_ALL_USER_CART:
      return {
        ...state,
        getAllUserCart: action.payload
      }
    case CLEAR_ALL_USER_CART:
      return {
        ...state,
        clearCartItems: action.payload
      }
    case DELETE_CART_FROM_ITEM:
      return {
        ...state,
        deleteItem: action.payload
      }
    case UPDATE_QUANTITY_OF_PRODUCT_IN_CART:
      return {
        ...state,
        updateQuantity: action.payload
      }
    case APPLAY_COUPON_CART:
      return {
        ...state,
        applayCoupon: action.payload
      }
    default: {
      return state
    }
  }
}

export default cartReducer