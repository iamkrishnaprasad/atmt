import axios from 'axios';
import { getToken } from '../../services/authServices';
import {
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAILURE,
} from './brandsTypes';

export const fetchBrandsRequest = () => ({
  type: FETCH_BRANDS_REQUEST,
});

export const fetchBrandsSuccess = (data) => ({
  type: FETCH_BRANDS_SUCCESS,
  payload: data,
});

export const fetchBrandsFailure = (error) => ({
  type: FETCH_BRANDS_FAILURE,
  payload: error,
});

export const fetchBrands = () => (dispatch) => {
  dispatch(fetchBrandsRequest());
  axios
    .get('/api/v1/brands', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchBrandsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchBrandsFailure(error.response.data.message));
    });
};

export const addBrandRequest = () => ({
  type: ADD_BRAND_REQUEST,
});

export const addBrandSuccess = () => ({
  type: ADD_BRAND_SUCCESS,
});

export const addBrandFailure = (error) => ({
  type: ADD_BRAND_FAILURE,
  payload: error,
});

export const addBrand = (payload) => (dispatch) => {
  dispatch(addBrandRequest());
  axios
    .post('/api/v1/brands', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addBrandSuccess());
      dispatch(fetchBrands());
    })
    .catch((error) => {
      dispatch(addBrandFailure(error.response.data.message));
    });
};

export const updateBrandRequest = () => ({
  type: UPDATE_BRAND_REQUEST,
});

export const updateBrandSuccess = () => ({
  type: UPDATE_BRAND_SUCCESS,
});

export const updateBrandFailure = (error) => ({
  type: UPDATE_BRAND_FAILURE,
  payload: error,
});

export const updateBrand = (id, payload) => (dispatch) => {
  dispatch(updateBrandRequest());
  axios
    .put(`/api/v1/brands/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateBrandSuccess());
      dispatch(fetchBrands());
    })
    .catch((error) => {
      dispatch(updateBrandFailure(error.response.data.message));
    });
};
