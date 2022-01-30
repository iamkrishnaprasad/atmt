import axios from 'axios';
import { getToken } from '../../services/authServices';
import {
  FETCH_BRANCHES_REQUEST,
  FETCH_BRANCHES_SUCCESS,
  FETCH_BRANCHES_FAILURE,
  ADD_BRANCH_REQUEST,
  ADD_BRANCH_SUCCESS,
  ADD_BRANCH_FAILURE,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAILURE,
} from './branchesTypes';

export const fetchBranchesRequest = () => ({
  type: FETCH_BRANCHES_REQUEST,
});

export const fetchBranchesSuccess = (data) => ({
  type: FETCH_BRANCHES_SUCCESS,
  payload: data,
});

export const fetchBranchesFailure = (error) => ({
  type: FETCH_BRANCHES_FAILURE,
  payload: error,
});

export const fetchBranches = () => (dispatch) => {
  dispatch(fetchBranchesRequest());
  axios
    .get('/api/v1/branches', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchBranchesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchBranchesFailure(error.response.data.message));
    });
};

export const addBranchRequest = () => ({
  type: ADD_BRANCH_REQUEST,
});

export const addBranchSuccess = () => ({
  type: ADD_BRANCH_SUCCESS,
});

export const addBranchFailure = (error) => ({
  type: ADD_BRANCH_FAILURE,
  payload: error,
});

export const addBranch = (payload) => (dispatch) => {
  dispatch(addBranchRequest());
  axios
    .post('/api/v1/branches', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addBranchSuccess());
      dispatch(fetchBranches());
    })
    .catch((error) => {
      dispatch(addBranchFailure(error.response.data.message));
    });
};

export const updateBranchRequest = () => ({
  type: UPDATE_BRANCH_REQUEST,
});

export const updateBranchSuccess = () => ({
  type: UPDATE_BRANCH_SUCCESS,
});

export const updateBranchFailure = (error) => ({
  type: UPDATE_BRANCH_FAILURE,
  payload: error,
});

export const updateBranch = (id, payload) => (dispatch) => {
  dispatch(updateBranchRequest());
  axios
    .put(`/api/v1/branches/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateBranchSuccess());
      dispatch(fetchBranches());
    })
    .catch((error) => {
      dispatch(updateBranchFailure(error.response.data.message));
    });
};
