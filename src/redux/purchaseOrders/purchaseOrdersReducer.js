/* eslint-disable default-param-last */
import {
  FETCH_PURCHASE_ORDERS_REQUEST,
  FETCH_PURCHASE_ORDERS_SUCCESS,
  FETCH_PURCHASE_ORDERS_FAILURE,
  ADD_PURCHASE_ORDER_REQUEST,
  ADD_PURCHASE_ORDER_SUCCESS,
  ADD_PURCHASE_ORDER_FAILURE,
  UPDATE_PURCHASE_ORDER_REQUEST,
  UPDATE_PURCHASE_ORDER_SUCCESS,
  UPDATE_PURCHASE_ORDER_FAILURE,
} from './purchaseOrdersTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const purchaseOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASE_ORDERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PURCHASE_ORDERS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_PURCHASE_ORDERS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_PURCHASE_ORDER_REQUEST:
      return { ...state, loading: true };
    case ADD_PURCHASE_ORDER_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_PURCHASE_ORDER_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_PURCHASE_ORDER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PURCHASE_ORDER_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_PURCHASE_ORDER_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default purchaseOrdersReducer;
