export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.vendorId?.trim() || values?.vendorId?.trim() === '-1') {
    errors.vendorId = 'Vendor is required.';
  }

  if (!values?.paymentTermId?.trim() || values?.paymentTermId?.trim() === '-1') {
    errors.paymentTermId = 'Payment term is required.';
  }

  if (!values?.purchasedOn?.trim()) {
    errors.purchasedOn = 'Purchased date is required.';
  }

  if (!values?.items?.length) {
    errors.items = 'Add atleast 1 item.';
  }

  return errors;
}
