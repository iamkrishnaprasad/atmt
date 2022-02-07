import axios from 'axios';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import { SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, SEARCH_PRODUCT_FAILURE, CLEAR_SEARCH_PRODUCT } from './searchTypes';

export const searchProductRequest = () => ({
  type: SEARCH_PRODUCT_REQUEST,
});

export const searchProductSuccess = (data) => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: data,
});

export const searchProductFailure = (error) => ({
  type: SEARCH_PRODUCT_FAILURE,
  payload: error,
});

export const clearSearchProduct = () => ({
  type: CLEAR_SEARCH_PRODUCT,
});

export const searchProduct = (payload) => (dispatch) => {
  dispatch(searchProductRequest());
  axios
    .post(`/api/v1/products/search`, payload, { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(searchProductSuccess(response.data));
      toast.success(response.data.message);
    })
    .catch((error) => {
      dispatch(searchProductFailure(error.response.data.message));
      toast.warn(error.response.data.message);
    });
};
