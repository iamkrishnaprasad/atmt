/* eslint-disable default-param-last */
import {
  FETCH_USER_ROLES_REQUEST,
  FETCH_USER_ROLES_SUCCESS,
  FETCH_USER_ROLES_FAILURE,
  ADD_USER_ROLE_REQUEST,
  ADD_USER_ROLE_SUCCESS,
  ADD_USER_ROLE_FAILURE,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
} from './userRolesTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const userRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ROLES_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_ROLES_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_USER_ROLES_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_USER_ROLE_REQUEST:
      return { ...state, loading: true };
    case ADD_USER_ROLE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_USER_ROLE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_USER_ROLE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_ROLE_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_USER_ROLE_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default userRolesReducer;
