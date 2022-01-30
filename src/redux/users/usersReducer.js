/* eslint-disable default-param-last */
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from './usersTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_USER_REQUEST:
      return { ...state, loading: true };
    case ADD_USER_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_USER_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
