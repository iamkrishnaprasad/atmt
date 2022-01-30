import { useSelector } from 'react-redux';

const getCategoriesData = () => useSelector((state) => state.categories.data);

const getCategoryNameById = (id) => {
  const categories = useSelector((state) => state.categories.data);
  if (categories.length > 0) {
    return categories?.find((category) => category.id === id)?.name ?? null;
  }
  return null;
};

export { getCategoriesData, getCategoryNameById };
