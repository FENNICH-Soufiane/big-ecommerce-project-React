import { GET_ALL_CATEGORY, GET_ERROR, CREATE_CATEGORY, GET_ONE_CATEGORY } from '../type'

const initial = {
  category: [],
  oneCategory: [],
  loading: true
}

const categoryReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      // la forme de données returner
      return {
        ...state,// envoyer l'ancien valeur
        category: action.payload,// envoyer la nouvelle valeur
        loading: false
      }
    case GET_ONE_CATEGORY:
      return {
        oneCategory: action.payload,// envoyer la nouvelle valeur
        loading: false
      }
    case CREATE_CATEGORY:
      return {
        ...state,// envoyer l'ancien valeur
        category: action.payload,// envoyer la nouvelle valeur
        loading: false
      }
    case GET_ERROR:
      return {
        loading: true,
        category: action.payload,
      }
    default:
      return state;
  }
}

export default categoryReducer