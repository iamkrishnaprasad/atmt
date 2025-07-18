export const API_TIMEOUT = '1000';

export const EMAIL_REGEX = `/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/`;

export const BRANCH_INITIAL_VALUE = {
  id: '',
  name: '',
  altName: '',
  buildingno: '',
  streetno: '',
  district: '',
  pobox: '',
  city: '',
  citycode: '',
  country: '',
  phone: '',
  landline: '',
  email: '',
  website: '',
  vatno: '',
  crno: '',
};

export const USER_ROLE_INITIAL_VALUE = {
  id: '',
  role: '',
};

export const USER_INITIAL_VALUE = {
  id: '',
  name: '',
  username: '',
  password: '',
  email: '',
  contact: '',
  userRoleId: '',
  branchId: '',
};

export const BRAND_INITIAL_VALUE = {
  id: '',
  name: '',
};

export const CATEGORY_INITIAL_VALUE = {
  id: '',
  name: '',
};

export const PAYMENT_TERM_INITIAL_VALUE = {
  id: '',
  name: '',
};

export const CLIENT_INITIAL_VALUE = {
  id: '',
  name: '',
  altName: '',
  type: '',
  buildingno: '',
  streetno: '',
  district: '',
  pobox: '',
  city: '',
  citycode: '',
  country: '',
  phone: '',
  landline: '',
  email: '',
  website: '',
  vatno: '',
  crno: '',
};

export const VENDOR_INITIAL_VALUE = {
  id: '',
  name: '',
  altName: '',
  buildingno: '',
  streetno: '',
  district: '',
  pobox: '',
  city: '',
  citycode: '',
  country: '',
  phone: '',
  landline: '',
  email: '',
  website: '',
  vatno: '',
  crno: '',
};

export const VAT_PERCENTAGE_INITIAL_VALUE = {
  id: '',
  vatPercentage: '',
};

export const UNIT_TYPE_INITIAL_VALUE = {
  id: '',
  name: '',
};

export const PRODUCT_INITIAL_VALUE = {
  name: '',
  altName: '',
  sellingPrice: '',
  discountPrice: '',
  vatPercentageId: '',
  brandId: '',
  categoryId: '',
  branchId: '',
  unitTypeId: '',
};

export const INVOICE_INITIAL_VALUE = {
  validTillNoDays: 0,
  refNo: '',
  paymentTermId: '',
  branchId: '',
  clientId: '',
  items: [],
};

export const DOTS = '...';

export const PURCHASE_ORDER_INITIAL_VALUE = {
  branchId: '',
  items: [],
  paymentTermId: '',
  purchasedOn: '',
  refNo: '',
  vendorId: '',
};
