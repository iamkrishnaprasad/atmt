/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { searchProduct } from '../../redux';
import styles from '../../components/Tables/Tables.module.scss';
import AutoComplete from '../../components/AutoComplete';
import validate from './validateInfo';
import { getUserBranchId } from '../../services/profile';
import toFormattedNumber from '../../utils/general';
import ViewPurchaseOrder from './viewPurchaseOrder';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add Purchase Order';
    case 'edit':
      return 'Update Purchase Order';
    default:
      return 'Purchase Order';
  }
}

function PurchaseOrderModal({ variant, isOpen, toggle, onSubmit, data }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userBranchId = getUserBranchId();
  const paymentTerms = useSelector((state) => state.paymentTerms.data);
  const vendors = useSelector((state) => state.vendors.data);
  const searchList = useSelector((state) => state.search.data);
  const isSearching = useSelector((state) => state.search.loading);
  const products = useSelector((state) => state.products.data);

  const [purchasedOn, setPurchasedOn] = useState();

  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  const addItem = (item) => {
    const isItemExist = !!items.filter((i) => i.productId === item.productId)?.length;
    if (!isItemExist) {
      const { name, productId, stockAvailable } = item;
      setItems([...items, { name, productId, stockAvailable, quantity: 1, totalDiscountAmount: 0, totalTaxAmount: 0, totalAmount: 0 }]);
    }
  };

  const searchKeyword = (keyword) => {
    dispatch(searchProduct({ keyword, stockCheck: false, isActive: true }));
  };

  useEffect(() => {
    setValues(data);
    setItems([]);
    setPurchasedOn();
  }, [variant, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, branchId: userBranchId });
    setErrors(validate({ ...values, items }, variant));
    setIsSubmitting(true);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    setIsSubmitting(false);
    setErrors({});
    toggle();
  };

  const removeKey = (objects, key) =>
    objects.map((object) => {
      if (typeof key === 'string') {
        if (key in object) {
          delete object[key];
        }
        return object;
      }
      return object;
    });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      let updatedItems = JSON.parse(JSON.stringify(items));
      ['name', 'stockAvailable'].forEach((key) => {
        updatedItems = removeKey(updatedItems, key);
      });
      onSubmit({ ...values, items: updatedItems });
      setIsSubmitting(false);
      setErrors({});
      toggle();
    }
  }, [errors]);

  const floatRegExp = /^([0-9]{1,})?(\.)?([0-9]{1,2})?$/;
  const floatRegExpWith4Decimal = /^([0-9]{1,})?(\.)?([0-9]{1,4})?$/;

  const handledPriceChange = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (name === 'totalDiscountAmount') {
            if (value.match(floatRegExpWith4Decimal)) {
              return { ...item, [name]: value };
            }
          } else if (value.match(floatRegExp)) {
            return { ...item, [name]: value };
          }
        }
        return item;
      })
    );
  };

  const checkPrice = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (Number.isNaN(value) || value === '') {
            return { ...item, [name]: 0 };
          }
          return { ...item, [name]: parseFloat(value) };
        }
        return item;
      })
    );
  };

  const handledQuantityChange = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (value > 0) {
            return { ...item, [name]: parseInt(value, 10) };
          }
          return { ...item, [name]: 1 };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (e, id) => {
    setItems([...items].filter((item) => item.productId !== id));
  };

  const handlePurchasedOn = (date) => {
    setPurchasedOn(date);
    if (isOpen) setValues({ ...values, purchasedOn: Moment(date).format('YYYY-MM-DD') });
  };

  return (
    <Modal isOpen={isOpen} style={{ maxWidth: '80%', maxHeight: '80%', zoom: '65%' }}>
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        {variant === 'readonly' ? (
          <ViewPurchaseOrder data={data} vendors={vendors} paymentTerms={paymentTerms} products={products} />
        ) : (
          <Form id="modalForm" onSubmit={handleSubmit} noValidate>
            <Row>
              <Col md={5}>
                <FormGroup>
                  <Label for="vendorIdField">Vendor</Label>
                  <Input
                    type="select"
                    name="vendorId"
                    id="vendorIdField"
                    autoComplete="off"
                    value={values?.vendorId}
                    invalid={!!errors?.vendorId}
                    onChange={handleChange}
                    disabled={variant === 'readonly'}
                  >
                    <option value="-1">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option value={vendor?.id} key={vendor?.id}>
                        {`${vendor?.name}${vendor?.vatno ? ` - ${vendor?.vatno}` : ''}`}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>{errors?.vendorId}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="purchasedOnField">Purchased On</Label>
                  <DatePicker
                    name="purchasedOn"
                    id="purchasedOnField"
                    dateFormat="dd-MM-yyyy"
                    selected={purchasedOn}
                    onChange={handlePurchasedOn}
                    className={`form-control${errors?.purchasedOn?.length ? ' is-invalid' : ''}`}
                    maxDate={new Date()}
                    autoComplete="off"
                    placeholderText="Select a date."
                  />
                  {errors?.purchasedOn?.length ? (
                    <div style={{ color: '#ff4b23', fontSize: '80%', marginTop: '0.25rem', width: '100%' }}>{errors?.purchasedOn}</div>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="paymentTermIdField">Payment Term</Label>
                  <Input
                    type="select"
                    name="paymentTermId"
                    id="paymentTermIdField"
                    autoComplete="off"
                    value={values?.paymentTermId}
                    invalid={!!errors?.paymentTermId}
                    onChange={handleChange}
                    disabled={variant === 'readonly'}
                  >
                    <option value="-1">Select Payment Term</option>
                    {paymentTerms.map((paymentTerm) => (
                      <option value={paymentTerm.id} key={paymentTerm.id}>
                        {paymentTerm.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>{errors?.paymentTermId}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="refNoField">Ref No.</Label>
                  <Input
                    type="text"
                    name="refNo"
                    id="refNoField"
                    placeholder="Enter Ref No."
                    autoComplete="off"
                    value={values?.refNo}
                    invalid={!!errors?.refNo}
                    onChange={handleChange}
                    disabled={variant === 'readonly'}
                    maxLength="30"
                  />
                  <FormFeedback>{errors?.refNo}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="searchField">Search Product</Label>
                  <AutoComplete
                    id="searchField"
                    placeholder="Enter Product Name or Code"
                    minLength={2}
                    maxLength={15}
                    labelKey="name"
                    onClick={addItem}
                    onInput={searchKeyword}
                    options={searchList}
                    loading={isSearching}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <div
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      height: '80vh',
                    }}
                    className={styles.scrollable}
                  >
                    <Table
                      className={classNames(`table-striped table-borderless ${items.length ? 'table-hover' : ''}`, styles.textAlignCenter)}
                      responsive
                      style={{ marginBottom: '0px' }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: '5%' }}>SR NO.</th>
                          <th style={{ width: '5%' }}>CODE</th>
                          <th className={styles.textAlignLeft} style={{ width: '30%' }}>
                            Product Name
                          </th>
                          <th style={{ width: '5%' }}>Stock Available</th>
                          <th style={{ width: '5%' }}>Quantity</th>
                          <th style={{ width: '8%' }}>Total Discount</th>
                          <th className={styles.textAlignRight} style={{ width: '8%' }}>
                            Tax Amount
                          </th>
                          <th className={styles.textAlignRight} style={{ width: '8%' }}>
                            Total Amount
                          </th>
                          <th style={{ width: '6%' }}>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.length ? (
                          items.map((item, index) => (
                            <tr key={item?.productId}>
                              <td style={{ width: '5%' }} className={styles.textAlignCenter}>
                                {index + 1}
                              </td>
                              <td style={{ width: '5%' }} className={styles.textAlignCenter}>
                                {item?.productId?.replace('PRODT', '')}
                              </td>
                              <td className={styles.textAlignLeft} style={{ width: '30%' }}>
                                {item?.name}
                              </td>
                              <td style={{ width: '5%' }}>{toFormattedNumber(item?.stockAvailable)}</td>
                              <td style={{ width: '5%' }}>
                                <Input
                                  type="text"
                                  name="quantity"
                                  id="quantityField"
                                  autoComplete="off"
                                  className={styles.textAlignRight}
                                  value={item?.quantity}
                                  onInput={(event) => {
                                    event.target.value = event.target.value.replace(/\D/g, '');
                                    event.target.value = event.target.value.length > 0 ? parseInt(event.target.value, 10) : '';
                                  }}
                                  onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handledQuantityChange(e, item?.productId)}
                                />
                              </td>
                              <td style={{ width: '8%' }}>
                                <Input
                                  type="text"
                                  name="totalDiscountAmount"
                                  id="totalDiscountAmountField"
                                  autoComplete="off"
                                  value={item?.totalDiscountAmount}
                                  className={styles.textAlignRight}
                                  onBlur={(e) => checkPrice(e, item?.productId)}
                                  onChange={(e) => handledPriceChange(e, item?.productId)}
                                />
                              </td>
                              <td style={{ width: '8%' }}>
                                <Input
                                  type="text"
                                  name="totalTaxAmount"
                                  id="totalTaxAmountField"
                                  autoComplete="off"
                                  value={item?.totalTaxAmount}
                                  className={styles.textAlignRight}
                                  onBlur={(e) => checkPrice(e, item?.productId)}
                                  onChange={(e) => handledPriceChange(e, item?.productId)}
                                />
                              </td>
                              <td style={{ width: '8%' }}>
                                <Input
                                  type="text"
                                  name="totalAmount"
                                  id="totalAmountField"
                                  autoComplete="off"
                                  value={item?.totalAmount}
                                  className={styles.textAlignRight}
                                  onBlur={(e) => checkPrice(e, item?.productId)}
                                  onChange={(e) => handledPriceChange(e, item?.productId)}
                                />
                              </td>
                              <td style={{ width: '8%' }}>
                                <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    className="eva eva-trash-2-outline"
                                    onClick={(e) => {
                                      handleDeleteItem(e, item?.productId);
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td style={{ paddingLeft: '18px', textAlign: 'left' }} colSpan="12">
                              Add Item's
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  {errors?.items ? (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                      {errors?.items}
                    </div>
                  ) : null}
                  <FormFeedback>{errors?.items}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 8, offset: 4 }}>
                <Row style={{ paddingBottom: '0.5rem', paddingTop: '0.5rem' }}>
                  <Col md={4}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Discount Amount: </strong>
                      <strong>{`${toFormattedNumber(
                        items?.reduce((partialSum, item) => partialSum + parseFloat(item?.totalDiscountAmount ?? 0), 0).toFixed(4)
                      )} SAR`}</strong>
                    </p>
                  </Col>
                  <Col md={4} className={styles.totalBorder}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Tax Amount: </strong>
                      <strong>{`${toFormattedNumber(
                        items?.reduce((partialSum, item) => partialSum + parseFloat(item?.totalTaxAmount ?? 0), 0).toFixed(2)
                      )} SAR`}</strong>
                    </p>
                  </Col>
                  <Col md={4} className={styles.totalBorder}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Amount: </strong>
                      <strong>{`${toFormattedNumber(
                        items?.reduce((partialSum, item) => partialSum + parseFloat(item?.totalAmount ?? 0), 0).toFixed(2)
                      )} SAR`}</strong>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
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

export default PurchaseOrderModal;
