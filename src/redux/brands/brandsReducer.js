/* eslint-disable default-param-last */
import {
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAILURE,
} from './brandsTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BRANDS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_BRANDS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_BRAND_REQUEST:
      return { ...state, loading: true };
    case ADD_BRAND_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_BRAND_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_BRAND_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BRAND_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_BRAND_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default brandsReducer;
