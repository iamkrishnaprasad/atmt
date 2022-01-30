/* eslint-disable default-param-last */
import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
} from './clientsTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CLIENTS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_CLIENTS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_CLIENT_REQUEST:
      return { ...state, loading: true };
    case ADD_CLIENT_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_CLIENT_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_CLIENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CLIENT_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_CLIENT_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default clientsReducer;
