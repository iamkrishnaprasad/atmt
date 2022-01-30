/* eslint-disable default-param-last */
import {
  FETCH_VENDORS_REQUEST,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_FAILURE,
  UPDATE_VENDOR_REQUEST,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
} from './vendorsTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const vendorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENDORS_REQUEST:
      return { ...state, loading: true };
    case FETCH_VENDORS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_VENDORS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_VENDOR_REQUEST:
      return { ...state, loading: true };
    case ADD_VENDOR_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_VENDOR_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_VENDOR_REQUEST:
      return { ...state, loading: true };
    case UPDATE_VENDOR_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_VENDOR_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default vendorsReducer;
