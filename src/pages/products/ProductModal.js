/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { getBrandsData } from '../../services/brands';
import { getCategoriesData } from '../../services/categories';
import { getUserBranchId } from '../../services/profile';
import { getVatPercentageData } from '../../services/vatPercentage';
import validate from './validateInfo';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add Product';
    case 'edit':
      return 'Update Product';
    default:
      return 'Product';
  }
}

function ProductModal({ variant, isOpen, toggle, onSubmit, data }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const userBranchId = getUserBranchId();

  useEffect(() => {
    setValues(data);
    setDiscountPercentage('');
  }, [variant, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, branchId: userBranchId });
    setErrors(validate(values, variant));
    setIsSubmitting(true);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    setIsSubmitting(false);
    setErrors({});
    toggle();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSubmit(values);
      setIsSubmitting(false);
      setErrors({});
      toggle();
    }
  }, [errors]);

  const brands = getBrandsData();
  const categories = getCategoriesData();
  const vatPercentages = getVatPercentageData();
  const unittypes = useSelector((state) => state.unitTypes.data);

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    setDiscountPercentage(value);
  };

  useEffect(() => {
    setValues({ ...values, discountPrice: (values.sellingPrice * (discountPercentage / 100)).toFixed(2) });
  }, [discountPercentage, values?.sellingPrice]);

  const floatRegExp = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

  const handleSellingPriceChange = (e) => {
    const { value } = e.target;
    if (value === '' || floatRegExp.test(value)) {
      setValues({ ...values, sellingPrice: value });
    }
  };

  return (
    <Modal isOpen={isOpen} style={{ zoom: '65%' }} size="lg">
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        <Form id="modalForm" onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label for="nameField">Product Name</Label>
            <Input
              type="text"
              name="name"
              id="nameField"
              placeholder="Enter Product Name"
              autoComplete="off"
              value={values?.name}
              invalid={!!errors?.name}
              onChange={handleChange}
              disabled={variant === 'readonly'}
              maxLength="70"
            />
            <FormFeedback>{errors?.name}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altnameField">Product Name (in arabic)</Label>
            <Input
              type="text"
              name="altname"
              id="altnameField"
              placeholder="Enter Product Name (in arabic)"
              autoComplete="off"
              value={values?.altname}
              invalid={!!errors?.altname}
              onChange={handleChange}
              disabled={variant === 'readonly'}
              maxLength="70"
            />
            <FormFeedback>{errors?.altname}</FormFeedback>
          </FormGroup>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="sellingPriceField">Selling Price</Label>
                <Input
                  type="text"
                  name="sellingPrice"
                  id="sellingPriceField"
                  placeholder="Enter Selling Price"
                  autoComplete="off"
                  value={values?.sellingPrice}
                  invalid={!!errors?.sellingPrice}
                  onChange={handleSellingPriceChange}
                  disabled={variant === 'readonly'}
                />
                <FormFeedback>{errors?.sellingPrice}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="discountPerentageField">Discount Percantage</Label>
                <InputGroup>
                  <Input
                    type="text"
                    name="discountPerentage"
                    id="discountPerentageField"
                    autoComplete="off"
                    value={discountPercentage}
                    onChange={handleDiscountChange}
                    disabled={variant === 'readonly' || values?.sellingPrice?.length === 0}
                    maxLength="3"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/\D/g, '');
                      event.target.value = event.target.value <= 100 ? event.target.value : 0;
                      event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                    }}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <InputGroupText
                    style={{
                      borderTopRightRadius: '8px',
                      borderTopLeftRadius: '0px',
                      borderBottomRightRadius: '8px',
                      borderBottomLeftRadius: '0px',
                    }}
                  >
                    %
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="discountPriceField">Discount Price</Label>
                <Input
                  type="text"
                  name="discountPrice"
                  id="discountPriceField"
                  placeholder="Enter Discount Price"
                  autoComplete="off"
                  value={values?.discountPrice}
                  invalid={!!errors?.discountPrice}
                  onChange={handleChange}
                  disabled={variant === 'readonly' || true}
                />
                <FormFeedback>{errors?.discountPrice}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="lowStockValueField">Low Stock Alert Value</Label>
                <Input
                  type="text"
                  name="lowStockValue"
                  id="lowStockValueField"
                  placeholder="Enter Low Stock Alert Value"
                  autoComplete="off"
                  value={values?.lowStockValue}
                  invalid={!!errors?.lowStockValue}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                  maxLength="2"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(/\D/g, '');
                    event.target.value = event.target.value <= 200 ? event.target.value : 0;
                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{errors?.lowStockValue}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="brandIdField">Brand</Label>
                <Input
                  type="select"
                  name="brandId"
                  id="brandIdField"
                  autoComplete="off"
                  value={values?.brandId}
                  invalid={!!errors?.brandId}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select Brand</option>
                  {brands.map((brand) => (
                    <option value={brand.id} key={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors?.brandId}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="categoryIdField">Category</Label>
                <Input
                  type="select"
                  name="categoryId"
                  id="categoryIdField"
                  autoComplete="off"
                  value={values?.categoryId}
                  invalid={!!errors?.categoryId}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select Category</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors?.categoryId}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="vatPercentageIdField">VAT %</Label>
                <Input
                  type="select"
                  name="vatPercentageId"
                  id="vatPercentageIdField"
                  autoComplete="off"
                  value={values?.vatPercentageId}
                  invalid={!!errors?.vatPercentageId}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select VAT %</option>
                  {vatPercentages.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.vatPercentage} %
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors?.vatPercentageId}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="unitTypeIdField">Unit Type</Label>
                <Input
                  type="select"
                  name="unitTypeId"
                  id="unitTypeIdField"
                  autoComplete="off"
                  value={values?.unitTypeId}
                  invalid={!!errors?.unitTypeId}
                  onChange={handleChange}
                  disabled={variant === 'readonly'}
                >
                  <option value="-1">Select Unit Type</option>
                  {unittypes.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors?.unitTypeId}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          {variant === 'edit' ? (
            <FormGroup check>
              <Input
                type="checkbox"
                name="isActive"
                id="isActiveField"
                checked={values?.isActive}
                // invalid={!!errors?.isActive}
                onChange={handleChange}
                disabled={variant === 'readonly'}
              />
              <Label for="isActiveField" check>
                Is Active?
              </Label>
            </FormGroup>
          ) : null}
        </Form>
      </ModalBody>
      <ModalFooter>
        {variant === 'readonly' ? null : (
          <Button color="success" type="submit" form="modalForm">
            {variant === 'add' ? 'Add' : 'Update'}
          </Button>
        )}
        <Button color="danger" onClick={handleClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ProductModal;
