/* eslint-disable default-param-last */
import {
  FETCH_BRANCHES_REQUEST,
  FETCH_BRANCHES_SUCCESS,
  FETCH_BRANCHES_FAILURE,
  ADD_BRANCH_REQUEST,
  ADD_BRANCH_SUCCESS,
  ADD_BRANCH_FAILURE,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAILURE,
} from './branchesTypes';

const initialState = {
  loading: false,
  data: [],
  errorMessage: '',
};

const branchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANCHES_REQUEST:
      return { ...state, loading: true };
    case FETCH_BRANCHES_SUCCESS:
      return { ...state, loading: false, data: action.payload, errorMessage: '' };
    case FETCH_BRANCHES_FAILURE:
      return { ...state, loading: false, data: [], errorMessage: action.payload };
    case ADD_BRANCH_REQUEST:
      return { ...state, loading: true };
    case ADD_BRANCH_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case ADD_BRANCH_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    case UPDATE_BRANCH_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BRANCH_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    case UPDATE_BRANCH_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default branchesReducer;
