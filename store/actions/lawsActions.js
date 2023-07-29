import axios from 'axios';
import {
  FETCH_LAWS_REQUEST,
  FETCH_LAWS_SUCCESS,
  FETCH_LAWS_FAILURE,
} from '../actionTypes/index';

export const fetchLawsRequest = () => {
  return {
    type: FETCH_LAWS_REQUEST,
  };
};

export const fetchLawsSuccess = laws => {
  return {
    type: FETCH_LAWS_SUCCESS,
    payload: laws,
  };
};

export const fetchLawsFailure = error => {
  return {
    type: FETCH_LAWS_FAILURE,
    payload: error,
  };
};

export const fetchLaws = () => {
  return dispatch => {
    dispatch(fetchLawsRequest());
    axios
      .get('https://api.theinitiatorz.com/public/api/laws')
      .then(response => {
        const laws = response.data;
        dispatch(fetchLawsSuccess(laws));
      })
      .catch(error => {
        dispatch(fetchLawsFailure(error.message));
      });
  };
};
