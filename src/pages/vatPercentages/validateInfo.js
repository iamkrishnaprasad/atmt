export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.vatPercentage?.trim()) {
    errors.vatPercentage = 'VAT Percentage is required.';
  }

  return errors;
}
