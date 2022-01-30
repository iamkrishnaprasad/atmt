/* eslint-disable default-param-last */
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './authTypes';

const authenticated = localStorage.getItem('accessToken1');

const initialState = {
  loading: false,
  isAuthenticated: !!authenticated,
  errorMessage: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, errorMessage: '' };
    case LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, errorMessage: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}
