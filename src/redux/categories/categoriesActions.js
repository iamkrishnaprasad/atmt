import axios from 'axios';
import { getToken } from '../../services/authServices';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
} from './categoriesTypes';

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (data) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: data,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());
  axios
    .get('/api/v1/categories', {
      headers: {
        'x-auth-token': getToken(),
      },
    })
    .then((response) => {
      dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCategoriesFailure(error.response.data.message));
    });
};

export const addCategoryRequest = () => ({
  type: ADD_CATEGORY_REQUEST,
});

export const addCategorySuccess = () => ({
  type: ADD_CATEGORY_SUCCESS,
});

export const addCategoryFailure = (error) => ({
  type: ADD_CATEGORY_FAILURE,
  payload: error,
});

export const addCategory = (payload) => (dispatch) => {
  dispatch(addCategoryRequest());
  axios
    .post('/api/v1/categories', payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(addCategorySuccess());
      dispatch(fetchCategories());
    })
    .catch((error) => {
      dispatch(addCategoryFailure(error.response.data.message));
    });
};

export const updateCategoryRequest = () => ({
  type: UPDATE_CATEGORY_REQUEST,
});

export const updateCategorySuccess = () => ({
  type: UPDATE_CATEGORY_SUCCESS,
});

export const updateCategoryFailure = (error) => ({
  type: UPDATE_CATEGORY_FAILURE,
  payload: error,
});

export const updateCategory = (id, payload) => (dispatch) => {
  dispatch(updateCategoryRequest());
  axios
    .put(`/api/v1/categories/${id}`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(updateCategorySuccess());
      dispatch(fetchCategories());
    })
    .catch((error) => {
      dispatch(updateCategoryFailure(error.response.data.message));
    });
};
