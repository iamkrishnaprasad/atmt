/* eslint-disable default-param-last */
import {
  FETCH_VAT_PERCENTAGES_REQUEST,
  FETCH_VAT_PERCENTAGES_SUCCESS,
  FETCH_VAT_PERCENTAGES_FAILURE,
  ADD_VAT_PERCENTAGE_REQUEST,
  ADD_VAT_PERCENTAGE_SUCCESS,
  ADD_VAT_PERCENTAGE_FAILURE,
  UPDATE_VAT_PERCENTAGE_REQUEST,
  UPDATE_VAT_PERCENTAGE_SUCCESS,
  UPDATE_VAT_PERCENTAGE_FAILURE,
} from './vatPercentagesTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const vatPercentageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VAT_PERCENTAGES_REQUEST:
      return { ...state, loading: true };
    case FETCH_VAT_PERCENTAGES_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_VAT_PERCENTAGES_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_VAT_PERCENTAGE_REQUEST:
      return { ...state, loading: true };
    case ADD_VAT_PERCENTAGE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_VAT_PERCENTAGE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_VAT_PERCENTAGE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_VAT_PERCENTAGE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_VAT_PERCENTAGE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default vatPercentageReducer;
