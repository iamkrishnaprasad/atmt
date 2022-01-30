export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = 'Category name is required';
  }

  return errors;
}
