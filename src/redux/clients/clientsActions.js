import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
} from './clientsTypes';

export const fetchClientsRequest = () => ({
  type: FETCH_CLIENTS_REQUEST,
});

export const fetchClientsSuccess = (data) => ({
  type: FETCH_CLIENTS_SUCCESS,
  payload: data,
});

export const fetchClientsFailure = (error) => ({
  type: FETCH_CLIENTS_FAILURE,
  payload: error,
});

export const fetchClients = () => (dispatch) => {
  dispatch(fetchClientsRequest());
  axios
    .get('/api/v1/clients', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchClientsSuccess(response.data));
      toast.success(response.message);
    })
    .catch((error) => {
      dispatch(fetchClientsFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const addClientRequest = () => ({
  type: ADD_CLIENT_REQUEST,
});

export const addClientSuccess = () => ({
  type: ADD_CLIENT_SUCCESS,
});

export const addClientFailure = (error) => ({
  type: ADD_CLIENT_FAILURE,
  payload: error,
});

export const addClient = (payload) => (dispatch) => {
  dispatch(addClientRequest());
  axios
    .post('/api/v1/clients', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addClientSuccess());
      toast.success(response.message);
      dispatch(fetchClients());
    })
    .catch((error) => {
      dispatch(addClientFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const updateClientRequest = () => ({
  type: UPDATE_CLIENT_REQUEST,
});

export const updateClientSuccess = () => ({
  type: UPDATE_CLIENT_SUCCESS,
});

export const updateClientFailure = (error) => ({
  type: UPDATE_CLIENT_FAILURE,
  payload: error,
});

export const updateClient = (id, payload) => (dispatch) => {
  dispatch(updateClientRequest());
  axios
    .put(`/api/v1/clients/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateClientSuccess());
      toast.success(response.message);
      dispatch(fetchClients());
    })
    .catch((error) => {
      dispatch(updateClientFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};
