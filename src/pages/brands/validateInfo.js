export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = 'Brand Name is required';
  }

  return errors;
}
