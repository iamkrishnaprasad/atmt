import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import { fetchProducts } from '../products/productsActions';
import {
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAILURE,
  UPDATE_INVOICE_REQUEST,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
} from './invoicesTypes';

export const fetchInvoicesRequest = () => ({
  type: FETCH_INVOICES_REQUEST,
});

export const fetchInvoicesSuccess = (data) => ({
  type: FETCH_INVOICES_SUCCESS,
  payload: data,
});

export const fetchInvoicesFailure = (error) => ({
  type: FETCH_INVOICES_FAILURE,
  payload: error,
});

export const fetchInvoices = () => (dispatch) => {
  dispatch(fetchInvoicesRequest());
  axios
    .get('/api/v1/invoices', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchInvoicesSuccess(response.data));
      toast.success(response.message);
      dispatch(fetchProducts());
    })
    .catch((error) => {
      dispatch(fetchInvoicesFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const addInvoiceRequest = () => ({
  type: ADD_INVOICE_REQUEST,
});

export const addInvoiceSuccess = () => ({
  type: ADD_INVOICE_SUCCESS,
});

export const addInvoiceFailure = (error) => ({
  type: ADD_INVOICE_FAILURE,
  payload: error,
});

export const addInvoice = (payload) => (dispatch) => {
  dispatch(addInvoiceRequest());
  axios
    .post('/api/v1/invoices', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addInvoiceSuccess());
      toast.success(response.message);
      dispatch(fetchInvoices());
    })
    .catch((error) => {
      dispatch(addInvoiceFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const updateInvoiceRequest = () => ({
  type: UPDATE_INVOICE_REQUEST,
});

export const updateInvoiceSuccess = () => ({
  type: UPDATE_INVOICE_SUCCESS,
});

export const updateInvoiceFailure = (error) => ({
  type: UPDATE_INVOICE_FAILURE,
  payload: error,
});

export const updateInvoice = (id, payload) => (dispatch) => {
  dispatch(updateInvoiceRequest());
  axios
    .put(`/api/v1/invoices/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateInvoiceSuccess());
      toast.success(response.message);
      dispatch(fetchInvoices());
    })
    .catch((error) => {
      dispatch(updateInvoiceFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};
