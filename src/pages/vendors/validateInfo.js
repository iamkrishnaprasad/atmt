/* eslint-disable no-useless-escape */
export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = 'Vendor name is required';
  } else if (values?.name?.trim().length < 5) {
    errors.name = 'Vendor name should have atleast 5 characters.';
  }

  if (!values?.vatno?.trim()) {
    errors.vatno = 'VAT no. is required';
  } else if (values?.vatno?.trim().length !== 0 && values?.vatno?.trim().length < 15) {
    errors.vatno = 'Enter a valid VAT no.';
  }

  if (!values?.crno?.trim()) {
    errors.crno = 'CR no. is required.';
  } else if (values?.crno?.trim().length !== 0 && values?.crno?.trim().length < 10) {
    errors.crno = 'Enter a valid CR no.';
  }

  if (values?.phone?.trim().length !== 0 && values?.phone?.trim().length < 9) {
    errors.phone = 'Enter a valid phone no.';
  }

  if (values?.landline?.trim().length !== 0 && values?.landline?.trim().length < 9) {
    errors.landline = 'Enter a valid landline no.';
  }

  if (values?.email?.trim().length !== 0 && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values?.email?.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (
    values?.website?.trim().length !== 0 &&
    !/^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(
      values?.website?.trim()
    )
  ) {
    errors.website = 'Enter a valid website.';
  }

  return errors;
}
