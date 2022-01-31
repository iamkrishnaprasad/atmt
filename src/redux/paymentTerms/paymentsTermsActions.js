import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import {
  FETCH_PAYMENT_TERMS_REQUEST,
  FETCH_PAYMENT_TERMS_SUCCESS,
  FETCH_PAYMENT_TERMS_FAILURE,
  ADD_PAYMENT_TERM_REQUEST,
  ADD_PAYMENT_TERM_SUCCESS,
  ADD_PAYMENT_TERM_FAILURE,
  UPDATE_PAYMENT_TERM_REQUEST,
  UPDATE_PAYMENT_TERM_SUCCESS,
  UPDATE_PAYMENT_TERM_FAILURE,
} from './paymentsTermsTypes';

export const fetchPaymentTermsRequest = () => ({
  type: FETCH_PAYMENT_TERMS_REQUEST,
});

export const fetchPaymentTermsSuccess = (data) => ({
  type: FETCH_PAYMENT_TERMS_SUCCESS,
  payload: data,
});

export const fetchPaymentTermsFailure = (error) => ({
  type: FETCH_PAYMENT_TERMS_FAILURE,
  payload: error,
});

export const fetchPaymentTerms = () => (dispatch) => {
  dispatch(fetchPaymentTermsRequest());
  axios
    .get('/api/v1/paymentterms', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchPaymentTermsSuccess(response.data));
      toast.success(response.message);
    })
    .catch((error) => {
      dispatch(fetchPaymentTermsFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const addPaymentTermRequest = () => ({
  type: ADD_PAYMENT_TERM_REQUEST,
});

export const addPaymentTermSuccess = () => ({
  type: ADD_PAYMENT_TERM_SUCCESS,
});

export const addPaymentTermFailure = (error) => ({
  type: ADD_PAYMENT_TERM_FAILURE,
  payload: error,
});

export const addPaymentTerm = (payload) => (dispatch) => {
  dispatch(addPaymentTermRequest());
  axios
    .post('/api/v1/paymentterms', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addPaymentTermSuccess());
      toast.success(response.message);
      dispatch(fetchPaymentTerms());
    })
    .catch((error) => {
      dispatch(addPaymentTermFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const updatePaymentTermRequest = () => ({
  type: UPDATE_PAYMENT_TERM_REQUEST,
});

export const updatePaymentTermSuccess = () => ({
  type: UPDATE_PAYMENT_TERM_SUCCESS,
});

export const updatePaymentTermFailure = (error) => ({
  type: UPDATE_PAYMENT_TERM_FAILURE,
  payload: error,
});

export const updatePaymentTerm = (id, payload) => (dispatch) => {
  dispatch(updatePaymentTermRequest());
  axios
    .put(`/api/v1/paymentterms/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updatePaymentTermSuccess());
      toast.success(response.message);
      dispatch(fetchPaymentTerms());
    })
    .catch((error) => {
      dispatch(updatePaymentTermFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};
