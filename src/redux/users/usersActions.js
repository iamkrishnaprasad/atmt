import axios from 'axios';
import { API_TIMEOUT } from '../../constant';
import { getToken } from '../../services/authServices';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from './usersTypes';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload,
});

export const fetchUsersFailure = (payload) => ({
  type: FETCH_USERS_FAILURE,
  payload,
});

export const fetchUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest());
  axios
    .get('/api/v1/users', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchUsersFailure(error.response.data.message));
    });
};

export const addUserRequest = () => ({
  type: ADD_USER_REQUEST,
});

export const addUserSuccess = () => ({
  type: ADD_USER_SUCCESS,
});

export const addUserFailure = (payload) => ({
  type: ADD_USER_FAILURE,
  payload,
});

export const addUser = (payload) => (dispatch) => {
  dispatch(addUserRequest());
  axios
    .post('/api/v1/users', payload, { headers: { 'x-auth-token': getToken() }, timeout: API_TIMEOUT })
    .then((response) => {
      dispatch(addUserSuccess());
      // toaster => (response.data)
      dispatch(fetchUsers());
    })
    .catch((error) => {
      dispatch(addUserFailure(error.response.data.message));
    });
};

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserFailure = (payload) => ({
  type: UPDATE_USER_FAILURE,
  payload,
});

export const updateUser = (id, payload) => (dispatch) => {
  dispatch(updateUserRequest());
  axios
    .put(`/api/v1/users/profile/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateUserSuccess());
      // toaster => (response.data)
      dispatch(fetchUsers());
    })
    .catch((error) => {
      dispatch(updateUserFailure(error.response.data.message));
    });
};
