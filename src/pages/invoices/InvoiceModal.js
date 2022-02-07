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
import { searchProduct } from '../../redux';
import styles from '../../components/Tables/Tables.module.scss';
import AutoComplete from './AutoComplete';
import validate from './validateInfo';
import { getUserBranchId } from '../../services/profile';

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

  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  const addItem = (item) => {
    const isItemExist = !!items.filter((i) => i.productId === item.productId)?.length;
    if (!isItemExist) {
      const updatedItem = { ...item, quantity: 1, sellingPrice: item.unitSellingPrice };
      setItems([...items, updatedItem]);
    }
  };

  const searchKeyword = (keyword) => {
    dispatch(searchProduct({ keyword }));
  };

  useEffect(() => {
    setValues(data);
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

  const paymentTerms = useSelector((state) => state.paymentTerms.data);
  const clients = useSelector((state) => state.clients.data);
  const searchList = useSelector((state) => state.search.data);
  const vatPercentages = useSelector((state) => state.vatPercentages.data);

  const getVATPercentageById = (id) => {
    if (vatPercentages.length > 0) {
      return vatPercentages?.find((vatPercentage) => vatPercentage.id === id)?.vatPercentage ?? null;
    }
    return null;
  };

  const floatRegExp = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

  // const handledItemChange = (e, id) => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case 'discountPrice':
  //       setItems((prev) =>
  //         prev.map((item) => {
  //           if (item.productId === id) {
  //             if (value === '' || floatRegExp.test(value)) {
  //               if (parseFloat(value) >= 0) {
  //                 if (item.marginPrice >= parseFloat(value)) {
  //                   return { ...item, discountPrice: parseFloat(value) };
  //                 }
  //                 return { ...item, discountPrice: parseFloat(item.marginPrice) };
  //               }
  //               return { ...item, discountPrice: 0 };
  //             }
  //           }
  //           return item;
  //         })
  //       );
  //       break;
  //     case 'sellingPrice':
  //       console.log('sellingPrice: ', value, ', Id: ', id);
  //       setItems((prev) =>
  //         prev.map((item) => {
  //           if (item.productId === id) {
  //             // if (parseFloat(value) >= 0) {
  //             // if (item.unitSellingPrice < parseFloat(value)) {
  //             if (value === '' || floatRegExp.test(value)) {
  //               return { ...item, sellingPrice: parseFloat(value) };
  //             }
  //             // }
  //             // return { ...item, sellingPrice: parseFloat(item.unitSellingPrice) };
  //           }
  //           // return { ...item, discountPrice: 0 };
  //           // }
  //           return item;
  //         })
  //       );
  //       break;
  //     case 'quantity':
  //       break;
  //     default:
  //       break;
  //   }

  //   // if (value === '' || floatRegExp.test(value)) {
  //   //   setValues({ ...values, sellingPrice: value });
  //   // }
  // };

  const handledSellingPriceChange = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (value === '' || floatRegExp.test(value)) {
            // if (item.unitSellingPrice < parseFloat(value)) {
            return { ...item, [name]: parseFloat(value) };
            // }
            // return { ...item, sellingPrice: parseFloat(item.unitSellingPrice) };
          }
        }
        return item;
      })
    );
  };

  const handledDiscountPriceChange = (e, id) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (parseFloat(value) >= 0) {
            if (item.marginPrice >= parseFloat(value)) {
              return { ...item, [name]: parseFloat(value) };
            }
            return { ...item, [name]: parseFloat(item.marginPrice) };
          }
          return { ...item, [name]: 0 };
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
              return { ...item, quantity: parseInt(value, 10) };
            }
            return { ...item, quantity: parseInt(item.stockAvailable, 10) };
          }
          return { ...item, quantity: 1 };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (e, id) => {
    setItems([...items].filter((item) => item.productId !== id));
  };

  return (
    <Modal isOpen={isOpen} style={{ maxWidth: '80%', maxHeight: '80%' }}>
      <ModalHeader>{getTitle(variant)}</ModalHeader>
      <ModalBody>
        <Form id="modalForm" onSubmit={handleSubmit} noValidate>
          <Row>
            <Col>
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
          </Row>
          <Row>
            <Col md={4}>
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
                  maxLength="15"
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
                  label=""
                  placeholder="Search Product"
                  minLength={2}
                  labelKey="name"
                  onClick={addItem}
                  onInput={searchKeyword}
                  options={searchList}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <div
                  style={{
                    borderTop: '1px solid #dee2e6',
                    borderLeft: '1px solid #dee2e6',
                    borderRight: '1px solid #dee2e6',
                    borderTopRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                  }}
                >
                  <Table
                    className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)}
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
                        <th style={{ width: '6%' }}>Unit Price</th>
                        <th style={{ width: '5%' }}>Quantity</th>
                        <th style={{ width: '5%' }}>Stock Available</th>
                        <th style={{ width: '8%' }}>Discount</th>
                        <th style={{ width: '8%' }}>Net Amount</th>
                        <th style={{ width: '4%' }}>VAT %</th>
                        <th style={{ width: '8%' }}>Tax Amount</th>
                        <th style={{ width: '8%' }}>Total Amount</th>
                        <th style={{ width: '8%' }}>Remove</th>
                      </tr>
                    </thead>
                  </Table>
                </div>
                <div
                  style={{
                    borderLeft: '1px solid #dee2e6',
                    borderRight: '1px solid #dee2e6',
                    height: '70vh',
                  }}
                  className={styles.scrollable}
                >
                  {items.length ? (
                    <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                      <tbody>
                        {items.map((item, index) => (
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
                                // onBlur={(e) => handledItemChange(e, item?.productId)}
                                onChange={(e) => handledSellingPriceChange(e, item?.productId)}
                              />
                            </td>
                            <td style={{ width: '5%' }}>
                              <Input
                                type="text"
                                name="quantity"
                                id="quantityField"
                                autoComplete="off"
                                maxLength="2"
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
                            <td style={{ width: '5%' }}>{item?.stockAvailable}</td>
                            <td style={{ width: '8%' }}>
                              <Input
                                type="text"
                                name="discountPrice"
                                id="discountPriceField"
                                autoComplete="off"
                                value={item?.discountPrice}
                                className={styles.textAlignRight}
                                onChange={(e) => handledDiscountPriceChange(e, item?.productId)}
                              />
                            </td>
                            <td className={styles.textAlignRight} style={{ width: '8%' }}>
                              {((item.sellingPrice - item.discountPrice) * item.quantity).toFixed(2)}
                            </td>
                            <td className={styles.textAlignRight} style={{ width: '4%' }}>
                              {getVATPercentageById(item?.vatPercentageId)} %
                            </td>
                            <td className={styles.textAlignRight} style={{ width: '8%' }}>
                              {(
                                (item.sellingPrice - item.discountPrice) *
                                item.quantity *
                                (getVATPercentageById(item?.vatPercentageId) / 100)
                              ).toFixed(2)}
                            </td>
                            <td style={{ width: '8%' }}>
                              {(
                                (item.sellingPrice - item.discountPrice) * item.quantity +
                                (item.sellingPrice - item.discountPrice) *
                                  item.quantity *
                                  (getVATPercentageById(item?.vatPercentageId) / 100)
                              ).toFixed(2)}
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
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Table className={classNames('table-striped table-borderless')} responsive>
                      <tbody>
                        <tr>
                          <td style={{ paddingLeft: '22px' }}>Add Item's</td>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    borderLeft: '1px solid #dee2e6',
                    borderRight: '1px solid #dee2e6',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px',
                  }}
                >
                  {/* <Table
                    className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)}
                    responsive
                    style={{ marginBottom: '0px' }}
                  >
                    <thead>
                      <tr>
                        <th className={styles.textAlignLeft} style={{ width: '64%' }}>
                          TOTAL
                        </th>
                        <th style={{ width: '8%' }}>Net Amount</th>
                        <th style={{ width: '4%' }}>+</th>
                        <th style={{ width: '8%' }}>Tax Amount</th>
                        <th style={{ width: '8%' }}>Total Amount</th>
                        <th style={{ width: '8%' }}> </th>
                      </tr>
                    </thead>
                  </Table> */}
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

export default InvoiceModal;
