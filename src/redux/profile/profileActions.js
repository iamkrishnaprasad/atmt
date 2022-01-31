import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../services/authServices';
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE } from './profileTypes';

export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (data) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: data,
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const fetchProfile = () => (dispatch) => {
  dispatch(fetchProfileRequest());
  axios
    .get('/api/v1/users/me', { headers: { 'x-auth-token': getToken() } })
    .then((response) => {
      dispatch(fetchProfileSuccess(response.data));
      toast.success(response.message);
    })
    .catch((error) => {
      dispatch(fetchProfileFailure(error.response.data.message));
      toast.error(error.response.data.message);
    });
};
