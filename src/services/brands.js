import { useSelector } from 'react-redux';

const getBrandsData = () => useSelector((state) => state.brands.data);

const getBrandNameById = (id) => {
  const brands = useSelector((state) => state.brands.data);
  if (brands.length > 0) {
    return brands?.find((brand) => brand.id === id)?.name ?? null;
  }
  return null;
};

export { getBrandsData, getBrandNameById };
