/* eslint-disable default-param-last */
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE } from './profileTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return { ...state, loading: true };
    case FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
