import { getFromLocalStorage } from '../utils/storage';

export const getToken = () => getFromLocalStorage('accessToken');

export const hasToken = () => !!getToken();
