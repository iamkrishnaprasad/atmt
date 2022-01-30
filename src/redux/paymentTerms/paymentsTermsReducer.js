/* eslint-disable default-param-last */
import {
  FETCH_PAYMENT_TERMS_REQUEST,
  FETCH_PAYMENT_TERMS_SUCCESS,
  FETCH_PAYMENT_TERMS_FAILURE,
  ADD_PAYMENT_TERM_REQUEST,
  ADD_PAYMENT_TERM_SUCCESS,
  ADD_PAYMENT_TERM_FAILURE,
  UPDATE_PAYMENT_TERM_REQUEST,
  UPDATE_PAYMENT_TERM_SUCCESS,
  UPDATE_PAYMENT_TERM_FAILURE,
} from './paymentsTermsTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const paymentsTermsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_TERMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PAYMENT_TERMS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_PAYMENT_TERMS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_PAYMENT_TERM_REQUEST:
      return { ...state, loading: true };
    case ADD_PAYMENT_TERM_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_PAYMENT_TERM_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_PAYMENT_TERM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PAYMENT_TERM_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_PAYMENT_TERM_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default paymentsTermsReducer;
