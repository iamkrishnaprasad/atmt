/* eslint-disable default-param-last */
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

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_CATEGORY_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_CATEGORY_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_CATEGORY_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
