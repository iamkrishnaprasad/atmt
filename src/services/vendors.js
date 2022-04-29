import { useSelector } from 'react-redux';

const getVendorsLoadingStatus = () => useSelector((state) => state.vendors.loading);
const getVendorsData = () => useSelector((state) => state.vendors.data);
const getVendorsErrorMessage = () => useSelector((state) => state.vendors.errorMessage);

const getVendorNameById = (id) => {
  const vendors = getVendorsData();
  if (vendors.length > 0) {
    return vendors?.find((vendor) => vendor.id === id)?.name ?? null;
  }
  return null;
};

export { getVendorsLoadingStatus, getVendorsData, getVendorsErrorMessage, getVendorNameById };
