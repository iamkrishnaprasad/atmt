export default function validateInfo(values, variant = '') {
  const errors = {};

  if (!values?.name?.trim()) {
    errors.name = 'Product name is required.';
  } else if (values?.name?.trim().length < 5) {
    errors.name = 'Product name should have atleast 5 characters.';
  }

  if (!values?.sellingPrice?.toString()?.trim()) {
    errors.sellingPrice = 'Selling price is required.';
  }

  if (!values?.lowStockValue?.toString()?.trim()) {
    errors.lowStockValue = 'Low stock alert value is required.';
  }

  if (!values?.vatPercentageId?.trim()) {
    errors.vatPercentageId = 'VAT Percentage is required.';
  }

  if (!values?.brandId?.trim()) {
    errors.brandId = 'Brand is required.';
  }

  if (!values?.categoryId?.trim()) {
    errors.categoryId = 'Category is required.';
  }

  if (!values?.branchId?.trim()) {
    errors.branchId = 'Branch is required.';
  }

  if (!values?.unitTypeId?.trim()) {
    errors.unitTypeId = 'Unit Type is required.';
  }

  return errors;
}
