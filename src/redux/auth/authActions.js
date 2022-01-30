import axios from 'axios';
import { removeFromLocalStorage, setToLocalStorage } from '../../utils/storage';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './authTypes';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

// logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  removeFromLocalStorage('accessToken');
  dispatch(logoutSuccess());
};

export const loginUser =
  ({ username = '', password = '' }) =>
  (dispatch) => {
    if (username.length > 0 && password.length > 0) {
      dispatch(loginRequest());
      axios
        .post('/api/v1/auth', { username, password })
        .then((response) => {
          const { 'x-auth-token': token } = response.headers;
          setToLocalStorage('accessToken', token);
          dispatch(loginSuccess());
        })
        .catch((error) => {
          dispatch(loginFailure(error.response.data.message));
        });
    } else {
      dispatch(loginFailure('Something went wrong. Try again'));
    }
  };
