import { CREATE_REVIEW, ALL_REVIEW_PRODUCT, DELETE_REVIEW,UPDATE_REVIEW } from '../type'

const initial = {
  createReview: [],
  allReviewProduct: [],
  deleteReview: [],
  updateReview: [],
  loading: true
}

const reviewReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      // la forme de données returner
      return {
        ...state,// envoyer l'ancien valeur
        createReview: action.payload,// envoyer la nouvelle valeur
        loading: false
      }
    case ALL_REVIEW_PRODUCT:
      return {
        ...state,
        allReviewProduct: action.payload,
        loading: false
      }
    case DELETE_REVIEW:
      return {
        ...state,
        deleteReview: action.payload,
        loading: false
      }
      case UPDATE_REVIEW:
      return {
        ...state,
        updateReview: action.payload,
        loading: false
      }
    default:
      return state;
  }
}

export default reviewReducer