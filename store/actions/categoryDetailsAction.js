import axios from 'axios';
import {
  FETCH_CATEGORY_DETAIL_FAILURE,
  FETCH_CATEGORY_DETAIL_REQUEST,
  FETCH_CATEGORY_DETAIL_SUCCESS,
} from '../actionTypes';

export const fetchCategoryDetailRequest = () => {
  return {
    type: FETCH_CATEGORY_DETAIL_REQUEST,
  };
};

export const fetchCategoryDetailSuccess = categoryDetails => {
  return {
    type: FETCH_CATEGORY_DETAIL_SUCCESS,
    payload: categoryDetails,
  };
};

export const fetchCategoryDetailFailure = error => {
  return {
    type: FETCH_CATEGORY_DETAIL_FAILURE,
    payload: error,
  };
};

export const fetchCategoryDetails = () => {
  return dispatch => {
    dispatch(fetchCategoryDetailRequest());
    axios
      .get('http://api.pakistancode.gov.pk/public/api/categorydetails')
      .then(response => {
        const categoryDetails = response.data;
        dispatch(fetchCategoryDetailSuccess(categoryDetails));
      })
      .catch(error => {
        dispatch(fetchCategoryDetailFailure(error.message));
      });
  };
};
