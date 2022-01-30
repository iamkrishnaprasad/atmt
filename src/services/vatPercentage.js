import { useSelector } from 'react-redux';

const getVatPercentageLoadingStatus = () => useSelector((state) => state.vatPercentages.loading);
const getVatPercentageData = () => useSelector((state) => state.vatPercentages.data);
const getVatPercentageerrorMessage = () => useSelector((state) => state.vatPercentages.errorMessage);

// const getVATPercentageById = (id) => {
//   const vatPercentages = useSelector((state) => state.vatPercentages.data);
//   if (vatPercentages.length > 0) {
//     return vatPercentages?.find((vatPercentage) => vatPercentage.id === id)?.vatPercentage ?? null;
//   }
//   return null;
// };

export { getVatPercentageLoadingStatus, getVatPercentageData, getVatPercentageerrorMessage };
