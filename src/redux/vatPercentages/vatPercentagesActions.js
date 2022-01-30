import axios from 'axios';
import { API_TIMEOUT } from '../../constant';
import { getToken } from '../../services/authServices';
import {
  FETCH_VAT_PERCENTAGES_REQUEST,
  FETCH_VAT_PERCENTAGES_SUCCESS,
  FETCH_VAT_PERCENTAGES_FAILURE,
  ADD_VAT_PERCENTAGE_REQUEST,
  ADD_VAT_PERCENTAGE_SUCCESS,
  ADD_VAT_PERCENTAGE_FAILURE,
  UPDATE_VAT_PERCENTAGE_REQUEST,
  UPDATE_VAT_PERCENTAGE_SUCCESS,
  UPDATE_VAT_PERCENTAGE_FAILURE,
} from './vatPercentagesTypes';

export const fetchVATPercentagesRequest = () => ({
  type: FETCH_VAT_PERCENTAGES_REQUEST,
});

export const fetchVATPercentagesSuccess = (data) => ({
  type: FETCH_VAT_PERCENTAGES_SUCCESS,
  payload: data,
});

export const fetchVATPercentagesFailure = (error) => ({
  type: FETCH_VAT_PERCENTAGES_FAILURE,
  payload: error,
});

export const fetchVATPercentages = () => (dispatch) => {
  dispatch(fetchVATPercentagesRequest());
  axios
    .get('/api/v1/vatpercentages', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchVATPercentagesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchVATPercentagesFailure(error.response.data.message));
    });
};

export const addVATPercentageRequest = () => ({
  type: ADD_VAT_PERCENTAGE_REQUEST,
});

export const addVATPercentageSuccess = () => ({
  type: ADD_VAT_PERCENTAGE_SUCCESS,
});

export const addVATPercentageFailure = (error) => ({
  type: ADD_VAT_PERCENTAGE_FAILURE,
  payload: error,
});

export const addVATPercentage = (payload) => (dispatch) => {
  dispatch(addVATPercentageRequest());
  axios
    .post('/api/v1/vatpercentages', payload, { headers: { 'x-auth-token': getToken() }, timeout: API_TIMEOUT })
    .then((response) => {
      dispatch(addVATPercentageSuccess());
      // toaster => (response.data)
      dispatch(fetchVATPercentages());
    })
    .catch((error) => {
      dispatch(addVATPercentageFailure(error.response.data.message));
    });
};

export const updateVATPercentageRequest = () => ({
  type: UPDATE_VAT_PERCENTAGE_REQUEST,
});

export const updateVATPercentageSuccess = () => ({
  type: UPDATE_VAT_PERCENTAGE_SUCCESS,
});

export const updateVATPercentageFailure = (error) => ({
  type: UPDATE_VAT_PERCENTAGE_FAILURE,
  payload: error,
});

export const updateVATPercentage = (id, payload) => (dispatch) => {
  dispatch(updateVATPercentageRequest());
  axios
    .put(`/api/v1/vatpercentages/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateVATPercentageSuccess());
      // toaster => (response.data)
      dispatch(fetchVATPercentages());
    })
    .catch((error) => {
      dispatch(updateVATPercentageFailure(error.response.data.message));
    });
};
