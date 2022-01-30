import axios from 'axios';
import { getToken } from '../../services/authServices';
import {
  FETCH_UNIT_TYPES_REQUEST,
  FETCH_UNIT_TYPES_SUCCESS,
  FETCH_UNIT_TYPES_FAILURE,
  ADD_UNIT_TYPE_REQUEST,
  ADD_UNIT_TYPE_SUCCESS,
  ADD_UNIT_TYPE_FAILURE,
  UPDATE_UNIT_TYPE_REQUEST,
  UPDATE_UNIT_TYPE_SUCCESS,
  UPDATE_UNIT_TYPE_FAILURE,
} from './unitTypesTypes';

export const fetchUnitTypesRequest = () => ({
  type: FETCH_UNIT_TYPES_REQUEST,
});

export const fetchUnitTypesSuccess = (data) => ({
  type: FETCH_UNIT_TYPES_SUCCESS,
  payload: data,
});

export const fetchUnitTypesFailure = (error) => ({
  type: FETCH_UNIT_TYPES_FAILURE,
  payload: error,
});

export const fetchUnitTypes = () => (dispatch) => {
  dispatch(fetchUnitTypesRequest());
  axios
    .get('/api/v1/unittypes', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchUnitTypesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchUnitTypesFailure(error.response.data.message));
    });
};

export const addUnitTypeRequest = () => ({
  type: ADD_UNIT_TYPE_REQUEST,
});

export const addUnitTypeSuccess = () => ({
  type: ADD_UNIT_TYPE_SUCCESS,
});

export const addUnitTypeFailure = (error) => ({
  type: ADD_UNIT_TYPE_FAILURE,
  payload: error,
});

export const addUnitType = (payload) => (dispatch) => {
  dispatch(addUnitTypeRequest());
  axios
    .post('/api/v1/unittypes', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addUnitTypeSuccess());
      dispatch(fetchUnitTypes());
    })
    .catch((error) => {
      dispatch(addUnitTypeFailure(error.response.data.message));
    });
};

export const updateUnitTypeRequest = () => ({
  type: UPDATE_UNIT_TYPE_REQUEST,
});

export const updateUnitTypeSuccess = () => ({
  type: UPDATE_UNIT_TYPE_SUCCESS,
});

export const updateUnitTypeFailure = (error) => ({
  type: UPDATE_UNIT_TYPE_FAILURE,
  payload: error,
});

export const updateUnitType = (id, payload) => (dispatch) => {
  dispatch(updateUnitTypeRequest());
  axios
    .put(`/api/v1/unittypes/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateUnitTypeSuccess());
      dispatch(fetchUnitTypes());
    })
    .catch((error) => {
      dispatch(updateUnitTypeFailure(error.response.data.message));
    });
};
