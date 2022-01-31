import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from './productsTypes';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (data) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsRequest());
  axios
    .get('/api/v1/products/all', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchProductsSuccess(response.data));
      toast.success(response.message);
    })
    .catch((error) => {
      dispatch(fetchProductsFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS,
});

export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

export const addProduct = (payload) => (dispatch) => {
  dispatch(addProductRequest());
  axios
    .post('/api/v1/products', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addProductSuccess());
      toast.success(response.message);
      dispatch(fetchProducts());
    })
    .catch((error) => {
      dispatch(addProductFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const updateProductRequest = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});

export const updateProductSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS,
});

export const updateProductFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProduct = (id, payload) => (dispatch) => {
  dispatch(updateProductRequest());
  axios
    .put(`/api/v1/products/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateProductSuccess());
      toast.success(response.message);
      dispatch(fetchProducts());
    })
    .catch((error) => {
      dispatch(updateProductFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};
