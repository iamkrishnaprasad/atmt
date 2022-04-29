import { useSelector } from 'react-redux';

const getPaymentTermsLoadingStatus = () => useSelector((state) => state.paymentTerms.loading);
const getPaymentTermsData = () => useSelector((state) => state.paymentTerms.data);
const getPaymentTermsErrorMessage = () => useSelector((state) => state.paymentTerms.errorMessage);

const getPaymentTermNameById = (id) => {
  const paymentTerms = getPaymentTermsData();
  if (paymentTerms.length > 0) {
    return paymentTerms?.find((paymentTerm) => paymentTerm.id === id)?.name ?? null;
  }
  return null;
};

export { getPaymentTermsLoadingStatus, getPaymentTermsData, getPaymentTermsErrorMessage, getPaymentTermNameById };
