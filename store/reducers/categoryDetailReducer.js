import {
  FETCH_CATEGORY_DETAIL_FAILURE,
  FETCH_CATEGORY_DETAIL_REQUEST,
  FETCH_CATEGORY_DETAIL_SUCCESS,
} from '../actionTypes';

const initialState = {
  loading: false,
  categoryDetails: [],
  error: '',
};

const categoryDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORY_DETAIL_SUCCESS:
      return {
        loading: false,
        categoryDetails: action.payload,
        error: '',
      };
    case FETCH_CATEGORY_DETAIL_FAILURE:
      return {
        loading: false,
        categoryDetails: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryDetailReducer;
