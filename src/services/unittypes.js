import { useSelector } from 'react-redux';

const getUnitTypesLoading = useSelector((state) => state.unitTypes.loading);
const getUnitTypesData = useSelector((state) => state.unitTypes.data);
const getUnitTypesErrorMessage = useSelector((state) => state.unitTypes.errorMessage);

export { getUnitTypesLoading, getUnitTypesData, getUnitTypesErrorMessage };
