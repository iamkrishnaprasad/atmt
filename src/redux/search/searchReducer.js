/* eslint-disable default-param-last */
import { SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, SEARCH_PRODUCT_FAILURE, CLEAR_SEARCH_PRODUCT } from './searchTypes';

const initialState = {
  loading: false,
  data: [],
  message: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { ...state, loading: true, data: [], message: '' };
    case SEARCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, data: action.payload.data, message: action.payload.message };
    case SEARCH_PRODUCT_FAILURE:
      return { ...state, loading: false, data: [], message: action.payload };
    case CLEAR_SEARCH_PRODUCT:
      return { ...state, loading: false, data: [], message: '' };
    default:
      return state;
  }
};

export default searchReducer;
