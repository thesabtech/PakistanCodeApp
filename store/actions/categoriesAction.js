import axios from 'axios';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actionTypes/index';

export const fetchCategoriesRequest = () => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

export const fetchCategoriesSuccess = categories => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesFailure = error => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
};

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesRequest());
    axios
      .get('http://api.pakistancode.gov.pk/public/api/categories')
      .then(response => {
        const categories = response.data;
        dispatch(fetchCategoriesSuccess(categories));
      })
      .catch(error => {
        dispatch(fetchCategoriesFailure(error.message));
      });
  };
};
