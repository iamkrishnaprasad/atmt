export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.clientId?.trim()) {
    errors.clientId = 'Client is required.';
  }

  if (!values?.paymentTermId?.trim()) {
    errors.paymentTermId = 'Payment term is required.';
  }

  if (!values?.items?.length) {
    errors.items = 'Add atleast 1 item.';
  }
  return errors;
}
