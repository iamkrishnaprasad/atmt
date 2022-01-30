import { useSelector } from 'react-redux';

const getProductsLoadingStatus = () => useSelector((state) => state.products.loading);
const getProductsData = () => useSelector((state) => state.products.data);
const getProductsErrorMessage = () => useSelector((state) => state.products.errorMessage);

export { getProductsLoadingStatus, getProductsData, getProductsErrorMessage };
