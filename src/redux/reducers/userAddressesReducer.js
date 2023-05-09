import { ADD_USER_ADDRESS, GET_ALL_USER_ADDRESS, DELETE_USER_ADDRESS } from '../type'

const initial = {
  addUserAddress: [],
  allAddresses: [],
  deleteAddresses: []
}

const userAddressesReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_USER_ADDRESS:
      return {
        ...state,
        addUserAddress: action.payload
      }
    case GET_ALL_USER_ADDRESS:
      return {
        ...state,
        allAddresses: action.payload
      }
    case DELETE_USER_ADDRESS:
      return {
        ...state,
        deleteAddresses: action.payload
      }
    default:
      return state
  }
}

export default userAddressesReducer