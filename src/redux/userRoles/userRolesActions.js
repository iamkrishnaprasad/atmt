import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import {
  FETCH_USER_ROLES_REQUEST,
  FETCH_USER_ROLES_SUCCESS,
  FETCH_USER_ROLES_FAILURE,
  ADD_USER_ROLE_REQUEST,
  ADD_USER_ROLE_SUCCESS,
  ADD_USER_ROLE_FAILURE,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
} from './userRolesTypes';

export const fetchUserRolesRequest = () => ({
  type: FETCH_USER_ROLES_REQUEST,
});

export const fetchUserRolesSuccess = (data) => ({
  type: FETCH_USER_ROLES_SUCCESS,
  payload: data,
});

export const fetchUserRolesFailure = (error) => ({
  type: FETCH_USER_ROLES_FAILURE,
  payload: error,
});

export const fetchUserRoles = () => (dispatch) => {
  dispatch(fetchUserRolesRequest());
  axios
    .get('/api/v1/userroles', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchUserRolesSuccess(response.data));
      toast.success(response.message);
    })
    .catch((error) => {
      dispatch(fetchUserRolesFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const addUserRoleRequest = () => ({
  type: ADD_USER_ROLE_REQUEST,
});

export const addUserRoleSuccess = () => ({
  type: ADD_USER_ROLE_SUCCESS,
});

export const addUserRoleFailure = (error) => ({
  type: ADD_USER_ROLE_FAILURE,
  payload: error,
});

export const addUserRole = (payload) => (dispatch) => {
  dispatch(addUserRoleRequest());
  axios
    .post('/api/v1/userroles', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addUserRoleSuccess());
      toast.success(response.message);
      dispatch(fetchUserRoles());
    })
    .catch((error) => {
      dispatch(addUserRoleFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};

export const updateUserRoleRequest = () => ({
  type: UPDATE_USER_ROLE_REQUEST,
});

export const updateUserRoleSuccess = () => ({
  type: UPDATE_USER_ROLE_SUCCESS,
});

export const updateUserRoleFailure = (error) => ({
  type: UPDATE_USER_ROLE_FAILURE,
  payload: error,
});

export const updateUserRole = (id, payload) => (dispatch) => {
  dispatch(updateUserRoleRequest());
  axios
    .put(`/api/v1/userroles/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateUserRoleSuccess());
      toast.success(response.message);
      dispatch(fetchUserRoles());
    })
    .catch((error) => {
      dispatch(updateUserRoleFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};
