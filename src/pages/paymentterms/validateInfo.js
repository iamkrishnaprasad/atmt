export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = 'Payment term is required.';
  }

  return errors;
}
