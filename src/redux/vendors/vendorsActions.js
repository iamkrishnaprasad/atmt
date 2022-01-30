import axios from 'axios';
import { getToken } from '../../services/authServices';
import {
  FETCH_VENDORS_REQUEST,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_FAILURE,
  UPDATE_VENDOR_REQUEST,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
} from './vendorsTypes';

export const fetchVendorsRequest = () => ({
  type: FETCH_VENDORS_REQUEST,
});

export const fetchVendorsSuccess = (data) => ({
  type: FETCH_VENDORS_SUCCESS,
  payload: data,
});

export const fetchVendorsFailure = (error) => ({
  type: FETCH_VENDORS_FAILURE,
  payload: error,
});

export const fetchVendors = () => (dispatch) => {
  dispatch(fetchVendorsRequest());
  axios
    .get('/api/v1/vendors', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchVendorsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchVendorsFailure(error.response.data.message));
    });
};

export const addVendorRequest = () => ({
  type: ADD_VENDOR_REQUEST,
});

export const addVendorSuccess = () => ({
  type: ADD_VENDOR_SUCCESS,
});

export const addVendorFailure = (error) => ({
  type: ADD_VENDOR_FAILURE,
  payload: error,
});

export const addVendor = (payload) => (dispatch) => {
  dispatch(addVendorRequest());
  axios
    .post('/api/v1/vendors', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addVendorSuccess());
      dispatch(fetchVendors());
    })
    .catch((error) => {
      dispatch(addVendorFailure(error.response.data.message));
    });
};

export const updateVendorRequest = () => ({
  type: UPDATE_VENDOR_REQUEST,
});

export const updateVendorSuccess = () => ({
  type: UPDATE_VENDOR_SUCCESS,
});

export const updateVendorFailure = (error) => ({
  type: UPDATE_VENDOR_FAILURE,
  payload: error,
});

export const updateVendor = (id, payload) => (dispatch) => {
  dispatch(updateVendorRequest());
  axios
    .put(`/api/v1/vendors/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateVendorSuccess());
      dispatch(fetchVendors());
    })
    .catch((error) => {
      dispatch(updateVendorFailure(error.response.data.message));
    });
};
