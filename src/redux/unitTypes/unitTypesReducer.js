/* eslint-disable default-param-last */
import {
  FETCH_UNIT_TYPES_REQUEST,
  FETCH_UNIT_TYPES_SUCCESS,
  FETCH_UNIT_TYPES_FAILURE,
  ADD_UNIT_TYPE_REQUEST,
  ADD_UNIT_TYPE_SUCCESS,
  ADD_UNIT_TYPE_FAILURE,
  UPDATE_UNIT_TYPE_REQUEST,
  UPDATE_UNIT_TYPE_SUCCESS,
  UPDATE_UNIT_TYPE_FAILURE,
} from './unitTypesTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const unitTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNIT_TYPES_REQUEST:
      return { ...state, loading: true };
    case FETCH_UNIT_TYPES_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_UNIT_TYPES_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_UNIT_TYPE_REQUEST:
      return { ...state, loading: true };
    case ADD_UNIT_TYPE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_UNIT_TYPE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_UNIT_TYPE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_UNIT_TYPE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_UNIT_TYPE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default unitTypesReducer;
