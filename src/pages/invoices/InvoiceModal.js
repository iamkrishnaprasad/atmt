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
  Spinner,
  Table,
} from 'reactstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Moment from 'moment';
import { searchProduct } from '../../redux';
import styles from '../../components/Tables/Tables.module.scss';
import AutoComplete from './AutoComplete';
import validate from './validateInfo';
import { getUserBranchId } from '../../services/profile';
import toFormattedNumber from '../../utils/general';
import Template from '../../pdf/Template';
import locale from '../../locale/pdfTemplate.json';

function getTitle(variant) {
  switch (variant) {
    case 'add':
      return 'Add Invoice';
    case 'edit':
      return 'Update Invoice';
    default:
      return 'Invoice';
  }
}

function InvoiceModal({ variant, isOpen, toggle, onSubmit, data }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userBranchId = getUserBranchId();
  const paymentTerms = useSelector((state) => state.paymentTerms.data);
  const clients = useSelector((state) => state.clients.data);
  const searchList = useSelector((state) => state.search.data);
  const isSearching = useSelector((state) => state.search.loading);
  const vatPercentages = useSelector((state) => state.vatPercentages.data);

  const getVATPercentageById = (id) => {
    if (vatPercentages.length > 0) {
      return vatPercentages?.find((vatPercentage) => vatPercentage.id === id)?.vatPercentage ?? null;
    }
    return null;
  };

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState({});

  useEffect(() => {
    /* eslint-disable no-underscore-dangle */
    let _totalNetAmount = 0;
    let _totalTaxAmount = 0;
    let _totalAmount = 0;

    if (items.length) {
      items.forEach((item) => {
        const netAmount = ((item.sellingPrice - item.discountPrice) * item.quantity).toFixed(2);
        const taxAmount = netAmount * (getVATPercentageById(item?.vatPercentageId) / 100).toFixed(2);

        _totalNetAmount += parseFloat(netAmount);
        _totalTaxAmount += parseFloat(taxAmount);
        _totalAmount += parseFloat(netAmount) + parseFloat(taxAmount);
      });
    }
    setTotal({
      totalNetAmount: _totalNetAmount.toFixed(2),
      totalTaxAmount: _totalTaxAmount.toFixed(2),
      totalAmount: _totalAmount.toFixed(2),
    });
    /* eslint-enable no-underscore-dangle */
  }, [items]);

  const dispatch = useDispatch();

  const addItem = (item) => {
    const isItemExist = !!items.filter((i) => i.productId === item.productId)?.length;
    if (!isItemExist) {
      if (item?.stockAvailable) {
        setItems([...items, { ...item, quantity: 1, sellingPrice: item.unitSellingPrice }]);
      }
    }
  };

  const searchKeyword = (keyword) => {
    dispatch(searchProduct({ keyword }));
  };

  useEffect(() => {
    setValues(data);
    setItems([]);
    setTotal({
      totalNetAmount: 0.0,
      totalTaxAmount: 0.0,
      totalAmount: 0.0,
    });
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
      ['name', 'marginPrice', 'stockAvailable', 'unitSellingPrice'].forEach((key) => {
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
          if (name === 'discountPrice') {
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

  const checkSellingPrice = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (item.unitSellingPrice > parseFloat(value) || Number.isNaN(value) || value === '') {
            return { ...item, [name]: parseFloat(item.unitSellingPrice) };
          }
          if (item.unitSellingPrice <= parseFloat(value)) {
            return { ...item, [name]: parseFloat(value) };
          }
        }
        return item;
      })
    );
  };

  const checkDiscountPrice = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (Number.isNaN(value) || value === '') {
            return { ...item, [name]: 0 };
          }
          if (item.marginPrice < parseFloat(value)) {
            return { ...item, [name]: parseFloat(item.marginPrice) };
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
            if (item.stockAvailable >= value) {
              return { ...item, [name]: parseInt(value, 10) };
            }
            return { ...item, [name]: parseInt(item.stockAvailable, 10) };
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

  return (
    <Modal isOpen={isOpen} style={{ maxWidth: '80%', maxHeight: '80%', zoom: '65%' }}>
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        {variant === 'readonly' ? (
          <div className="d-flex flex-column">
            <Row>
              <Col md={4}>
                <span style={{ fontWeight: '700' }}>Company Details: </span>
                <br />
                <div style={{ marginLeft: '10px' }}>
                  {data?.company?.name ? (
                    <>
                      <span>{data?.company?.name.trim()?.toUpperCase()}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.buildingno?.trim()?.length ||
                  data?.company?.streetno?.trim()?.length ||
                  data?.company?.district?.trim()?.length ? (
                    <>
                      <span>
                        {data?.company?.buildingno?.trim()?.length ? (
                          <span>{`${data?.company?.buildingno?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                        {data?.company?.streetno?.trim()?.length ? (
                          <span>{`${data?.company?.streetno?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                        {data?.company?.district?.trim()?.length ? (
                          <span>{`${data?.company?.district?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                      </span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.pobox?.trim()?.length ||
                  data?.company?.city?.trim()?.length ||
                  data?.company?.citycode?.trim()?.length ? (
                    <>
                      <span>
                        {data?.company?.pobox?.trim()?.length ? (
                          <span>{`POST BOX: ${data?.company?.pobox?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                        {data?.company?.city?.trim()?.length ? <span>{`${data?.company?.city?.trim()?.toUpperCase()}, `}</span> : null}
                        {data?.company?.citycode?.trim()?.length ? (
                          <span>{`${data?.company?.citycode?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                      </span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.country?.trim()?.length ? (
                    <>
                      <span>{`${data?.company?.country?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.vatno?.length ? (
                    <>
                      <span>{`${locale?.en?.vatno} : ${data?.company?.vatno}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.crno ? (
                    <>
                      <span>{`${locale?.en?.crno} : ${data?.company?.crno}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.phone?.length ? (
                    <>
                      <span>{`${locale?.en?.phone} : +966 ${data?.company?.phone}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.landline?.length ? (
                    <>
                      <span>{`${locale?.en?.landline} : +966 ${data?.company?.landline}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.email?.length ? (
                    <>
                      <span>{`${locale?.en?.email} : ${data?.company?.email}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.company?.website?.length ? (
                    <>
                      <span>{`${locale?.en?.website} : ${data?.company?.website}`}</span>
                      <br />
                    </>
                  ) : null}
                </div>
              </Col>
              <Col md={4}>
                <span style={{ fontWeight: '700' }}>Order Details: </span>
                <br />
                <div style={{ marginLeft: '10px' }}>
                  {data?.id?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.orderno} : ${data?.id?.trim()?.replace('ORD', '').toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.orderNo?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.invoiceno} : ${data?.orderNo?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.paymentTerm?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.paymentterm} : ${data?.paymentTerm?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.issuedDate?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.issueddate} : ${Moment(data?.issuedDate?.trim()?.toUpperCase()).format('YYYY-MM-DD')}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.validTill?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.validtill} : ${Moment(data?.validTill?.trim()?.toUpperCase()).format('YYYY-MM-DD')}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.refNo?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.refno} : ${data?.refNo?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                </div>
              </Col>
              <Col md={4}>
                <span style={{ fontWeight: '700' }}>Billed To: </span>
                <br />
                <div style={{ marginLeft: '10px' }}>
                  {data?.client?.name?.trim()?.length ? (
                    <>
                      <span>{data?.client?.name?.trim()?.toUpperCase()}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.buildingno?.trim()?.length ||
                  data?.client?.streetno?.trim()?.length ||
                  data?.client?.district?.trim()?.length ? (
                    <>
                      <span>
                        {data?.client?.buildingno?.trim()?.length ? (
                          <span>{`${data?.client?.buildingno?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                        {data?.client?.streetno?.trim()?.length ? (
                          <span>{`${data?.client?.streetno?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                        {data?.client?.district?.trim()?.length ? (
                          <span>{`${data?.client?.district?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                      </span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.pobox?.trim()?.length || data?.client?.city?.trim()?.length || data?.client?.citycode?.trim()?.length ? (
                    <>
                      <span>
                        {data?.client?.pobox?.trim()?.length ? (
                          <span>{`POST BOX: ${data?.client?.pobox?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                        {data?.client?.city?.trim()?.length ? <span>{`${data?.client?.city?.trim()?.toUpperCase()}, `}</span> : null}
                        {data?.client?.citycode?.trim()?.length ? (
                          <span>{`${data?.client?.citycode?.trim()?.toUpperCase()}, `}</span>
                        ) : null}
                      </span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.country?.trim()?.length ? (
                    <>
                      <span>{`${data?.client?.country?.trim()?.toUpperCase()}, `}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.vatno?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.vatno} : ${data?.client?.vatno?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.crno?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.crno} : ${data?.client?.crno?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.contact?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.contactno} : +966 ${data?.client?.contact?.trim()?.toUpperCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.email?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.email} : ${data?.client?.email?.trim()?.toLowerCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                  {data?.client?.website?.trim()?.length ? (
                    <>
                      <span>{`${locale?.en?.website} : ${data?.client?.website?.trim()?.toLowerCase()}`}</span>
                      <br />
                    </>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <span style={{ fontSize: '20px', fontWeight: 700 }}>{data?.type}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    height: '70vh',
                  }}
                  className={styles.scrollable}
                >
                  <Table
                    className={classNames(`table-striped table-borderless}`, styles.textAlignCenter)}
                    responsive
                    style={{ marginBottom: '0px' }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>SR NO.</th>
                        <th style={{ width: '5%' }}>CODE</th>
                        <th className={styles.textAlignLeft} style={{ width: '30%' }}>
                          DESCRIPTION
                        </th>
                        <th style={{ width: '6%' }}>UOM</th>
                        <th className={styles.textAlignRight} style={{ width: '8%' }}>
                          UNIT PRICE
                        </th>
                        <th className={styles.textAlignRight} style={{ width: '6%' }}>
                          QUANTITY
                        </th>
                        <th className={styles.textAlignRight} style={{ width: '8%' }}>
                          DISCOUNT
                        </th>
                        <th className={styles.textAlignRight} style={{ width: '9%' }}>
                          NET AMOUNT
                        </th>
                        <th className={styles.textAlignRight} style={{ width: '5%' }}>
                          VAT %
                        </th>
                        <th className={styles.textAlignRight} style={{ width: '9%' }}>
                          TAX AMOUNT
                        </th>
                        <th className={styles.textAlignRight} style={{ width: '9%' }}>
                          TOTAL AMOUNT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.items?.map((item, index) => (
                        <tr key={index}>
                          <td className={styles.textAlignCenter}>{index + 1}</td>
                          <td className={styles.textAlignCenter}>{item?.code}</td>
                          <td className={styles.textAlignLeft}>{item?.product?.en}</td>
                          <td>{item?.uom}</td>
                          <td className={styles.textAlignRight}>{item?.sellingPrice}</td>
                          <td className={styles.textAlignRight}>{item?.quantity}</td>
                          <td className={styles.textAlignRight}>{parseFloat(item?.discountPrice) * parseFloat(item?.quantity)}</td>
                          <td className={styles.textAlignRight}>
                            {toFormattedNumber(((item.sellingPrice - item.discountPrice) * item.quantity).toFixed(2))}
                          </td>
                          <td className={styles.textAlignRight}>{item?.vatPercentage} %</td>
                          <td className={styles.textAlignRight}>
                            {toFormattedNumber(
                              ((item.sellingPrice - item.discountPrice) * item.quantity * (parseFloat(item?.vatPercentage) / 100)).toFixed(
                                2
                              )
                            )}
                          </td>
                          <td className={styles.textAlignRight}>
                            {toFormattedNumber(
                              (
                                (item.sellingPrice - item.discountPrice) * item.quantity +
                                (item.sellingPrice - item.discountPrice) * item.quantity * (parseFloat(item?.vatPercentage) / 100)
                              ).toFixed(2)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 8, offset: 4 }}>
                <Row style={{ paddingBottom: '0.5rem', paddingTop: '0.5rem' }}>
                  <Col md={4}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Net Amount: </strong>
                      <strong>{`${toFormattedNumber(data?.netAmount ?? 0)} SAR`}</strong>
                    </p>
                  </Col>
                  <Col md={4} className={styles.totalBorder}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Tax Amount: </strong>
                      <strong>{`${toFormattedNumber(data?.totalTax ?? 0)} SAR`}</strong>
                    </p>
                  </Col>
                  <Col md={4} className={styles.totalBorder}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Amount: </strong>
                      <strong>{`${toFormattedNumber((parseFloat(data?.netAmount) + parseFloat(data?.totalTax)).toFixed(2))} SAR`}</strong>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        ) : (
          <Form id="modalForm" onSubmit={handleSubmit} noValidate>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="clientIdField">Client</Label>
                  <Input
                    type="select"
                    name="clientId"
                    id="clientIdField"
                    autoComplete="off"
                    value={values?.clientId}
                    invalid={!!errors?.clientId}
                    onChange={handleChange}
                    disabled={variant === 'readonly'}
                  >
                    <option value="-1">Select client</option>
                    {clients.map((client) => (
                      <option value={client?.id} key={client?.id}>
                        {`${client?.name}${client?.vatno ? ` - ${client?.vatno}` : ''}`}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>{errors?.clientId}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={3}>
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
                    <option value="-1">Select payment term</option>
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
                  <AutoComplete
                    id="searchField"
                    placeholder="Search Product"
                    minLength={2}
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
                          <th style={{ width: '8%' }}>Unit Price</th>
                          <th style={{ width: '8%' }}>Discount</th>
                          <th style={{ width: '5%' }}>Quantity</th>
                          <th style={{ width: '5%' }}>Stock Available</th>
                          <th className={styles.textAlignRight} style={{ width: '8%' }}>
                            Net Amount
                          </th>
                          <th className={styles.textAlignRight} style={{ width: '4%' }}>
                            VAT %
                          </th>
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
                              <td style={{ width: '6%' }}>
                                <Input
                                  type="text"
                                  name="sellingPrice"
                                  id="sellingPriceField"
                                  autoComplete="off"
                                  value={item?.sellingPrice}
                                  className={styles.textAlignRight}
                                  onBlur={(e) => checkSellingPrice(e, item?.productId)}
                                  onChange={(e) => handledPriceChange(e, item?.productId)}
                                />
                              </td>
                              <td style={{ width: '8%' }}>
                                <Input
                                  type="text"
                                  name="discountPrice"
                                  id="discountPriceField"
                                  autoComplete="off"
                                  value={item?.discountPrice}
                                  className={styles.textAlignRight}
                                  onBlur={(e) => checkDiscountPrice(e, item?.productId)}
                                  onChange={(e) => handledPriceChange(e, item?.productId)}
                                />
                              </td>
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
                              <td style={{ width: '5%' }}>{toFormattedNumber(item?.stockAvailable)}</td>
                              <td className={styles.textAlignRight} style={{ width: '8%' }}>
                                {toFormattedNumber(((item.sellingPrice - item.discountPrice) * item.quantity).toFixed(2))}
                              </td>
                              <td className={styles.textAlignRight} style={{ width: '4%' }}>
                                {getVATPercentageById(item?.vatPercentageId)} %
                              </td>
                              <td className={styles.textAlignRight} style={{ width: '8%' }}>
                                {toFormattedNumber(
                                  (
                                    (item.sellingPrice - item.discountPrice) *
                                    item.quantity *
                                    (getVATPercentageById(item?.vatPercentageId) / 100)
                                  ).toFixed(2)
                                )}
                              </td>
                              <td className={styles.textAlignRight} style={{ width: '8%' }}>
                                {toFormattedNumber(
                                  (
                                    (item.sellingPrice - item.discountPrice) * item.quantity +
                                    (item.sellingPrice - item.discountPrice) *
                                      item.quantity *
                                      (getVATPercentageById(item?.vatPercentageId) / 100)
                                  ).toFixed(2)
                                )}
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
                      <strong>Total Net Amount: </strong>
                      <strong>{`${toFormattedNumber(total?.totalNetAmount ?? 0)} SAR`}</strong>
                    </p>
                  </Col>
                  <Col md={4} className={styles.totalBorder}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Tax Amount: </strong>
                      <strong>{`${toFormattedNumber(total?.totalTaxAmount ?? 0)} SAR`}</strong>
                    </p>
                  </Col>
                  <Col md={4} className={styles.totalBorder}>
                    <p className="d-flex justify-content-between">
                      <strong>Total Amount: </strong>
                      <strong>{`${toFormattedNumber(total?.totalAmount ?? 0)} SAR`}</strong>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        {variant === 'readonly' ? (
          <PDFDownloadLink document={<Template order={data} />} fileName={data?.orderNo}>
            {({ loading }) =>
              loading ? <Spinner style={{ width: '1.5rem', height: '1.5rem' }} /> : <Button color="success">Download Invoice</Button>
            }
          </PDFDownloadLink>
        ) : (
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

export default InvoiceModal;
