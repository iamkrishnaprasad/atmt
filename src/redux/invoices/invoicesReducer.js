/* eslint-disable default-param-last */
import {
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAILURE,
  UPDATE_INVOICE_REQUEST,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
} from './invoicesTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const invoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES_REQUEST:
      return { ...state, loading: true };
    case FETCH_INVOICES_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_INVOICES_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_INVOICE_REQUEST:
      return { ...state, loading: true };
    case ADD_INVOICE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_INVOICE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_INVOICE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_INVOICE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_INVOICE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default invoicesReducer;
