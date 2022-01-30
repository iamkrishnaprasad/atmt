/* eslint-disable no-useless-escape */
import { EMAIL_REGEX } from '../../constant';

export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = `Name is required.`;
  } else if (values?.name?.trim().length < 3) {
    errors.name = 'Name should have atleast 3 characters.';
  }

  if (!values?.username?.trim()) {
    errors.username = 'Username is required.';
  } else if (values?.username?.trim().length < 5) {
    errors.username = 'Username should have atleast 5 characters.';
  }

  if (variant !== 'edit') {
    if (!values?.password?.trim()) {
      errors.password = 'Password is required.';
    } else if (values?.password?.trim().length < 5) {
      errors.password = 'Password should have atleast 5 characters.';
    }
  }

  if (values?.email?.trim().length !== 0 && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values?.email?.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (values?.contact?.trim().length !== 0 && values?.contact?.trim().length < 9) {
    errors.contact = 'Enter a valid Contact no.';
  }

  if (values?.userRoleId?.trim() === '' || values?.userRoleId?.trim() === '-1') {
    errors.userRoleId = 'Select a User role.';
  }

  if (values?.branchId?.trim() === '' || values?.branchId?.trim() === '-1') {
    errors.branchId = 'Select a Branch.';
  }

  return errors;
}
