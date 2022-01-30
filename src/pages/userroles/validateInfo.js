export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.role?.trim()) {
    errors.role = 'User role is required';
  } else if (values?.role?.trim().length < 3) {
    errors.role = 'User role should have atleast 3 characters';
  }

  return errors;
}
