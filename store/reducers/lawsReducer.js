import {
  FETCH_LAWS_REQUEST,
  FETCH_LAWS_SUCCESS,
  FETCH_LAWS_FAILURE,
} from '../actionTypes';

const initialState = {
  loading: false,
  laws: [],
  error: '',
};

const lawsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LAWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LAWS_SUCCESS:
      return {
        loading: false,
        laws: action.payload,
        error: '',
      };
    case FETCH_LAWS_FAILURE:
      return {
        loading: false,
        laws: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default lawsReducer;
