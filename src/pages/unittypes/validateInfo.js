export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = 'Unit Type is required';
  }

  return errors;
}
