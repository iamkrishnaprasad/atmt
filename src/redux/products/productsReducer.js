/* eslint-disable default-param-last */
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

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_PRODUCT_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default productsReducer;
