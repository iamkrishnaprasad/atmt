import axios from 'axios';
import { getToken } from '../../services/authServices';
import {
  FETCH_PURCHASE_ORDERS_REQUEST,
  FETCH_PURCHASE_ORDERS_SUCCESS,
  FETCH_PURCHASE_ORDERS_FAILURE,
  ADD_PURCHASE_ORDER_REQUEST,
  ADD_PURCHASE_ORDER_SUCCESS,
  ADD_PURCHASE_ORDER_FAILURE,
  UPDATE_PURCHASE_ORDER_REQUEST,
  UPDATE_PURCHASE_ORDER_SUCCESS,
  UPDATE_PURCHASE_ORDER_FAILURE,
} from './purchaseOrdersTypes';

export const fetchPurchaseOrdersRequest = () => ({
  type: FETCH_PURCHASE_ORDERS_REQUEST,
});

export const fetchPurchaseOrdersSuccess = (data) => ({
  type: FETCH_PURCHASE_ORDERS_SUCCESS,
  payload: data,
});

export const fetchPurchaseOrdersFailure = (error) => ({
  type: FETCH_PURCHASE_ORDERS_FAILURE,
  payload: error,
});

export const fetchPurchaseOrders = () => (dispatch) => {
  dispatch(fetchPurchaseOrdersRequest());
  axios
    .get('/api/v1/order/purchases', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchPurchaseOrdersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchPurchaseOrdersFailure(error.response.data.message));
    });
};

export const addPurchaseOrderRequest = () => ({
  type: ADD_PURCHASE_ORDER_REQUEST,
});

export const addPurchaseOrderSuccess = () => ({
  type: ADD_PURCHASE_ORDER_SUCCESS,
});

export const addPurchaseOrderFailure = (error) => ({
  type: ADD_PURCHASE_ORDER_FAILURE,
  payload: error,
});

export const addPurchaseOrder = (payload) => (dispatch) => {
  dispatch(addPurchaseOrderRequest());
  axios
    .post('/api/v1/order/purchases', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addPurchaseOrderSuccess());
      dispatch(fetchPurchaseOrders());
    })
    .catch((error) => {
      dispatch(addPurchaseOrderFailure(error.response.data.message));
    });
};

export const updatePurchaseOrderRequest = () => ({
  type: UPDATE_PURCHASE_ORDER_REQUEST,
});

export const updatePurchaseOrderSuccess = () => ({
  type: UPDATE_PURCHASE_ORDER_SUCCESS,
});

export const updatePurchaseOrderFailure = (error) => ({
  type: UPDATE_PURCHASE_ORDER_FAILURE,
  payload: error,
});

export const updatePurchaseOrder = (id, payload) => (dispatch) => {
  dispatch(updatePurchaseOrderRequest());
  axios
    .put(`/api/v1/order/purchases/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updatePurchaseOrderSuccess());
      dispatch(fetchPurchaseOrders());
    })
    .catch((error) => {
      dispatch(updatePurchaseOrderFailure(error.response.data.message));
    });
};
