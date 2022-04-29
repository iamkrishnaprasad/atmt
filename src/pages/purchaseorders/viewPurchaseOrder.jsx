import classNames from 'classnames';
import React from 'react';
import { Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import toFormattedNumber from '../../utils/general';
import styles from '../../components/Tables/Tables.module.scss';

function ViewPurchaseOrder({ data, vendors, paymentTerms, products }) {
  const getProductNameById = (id) => {
    if (products.length > 0) {
      return products?.find((product) => product.id === id)?.name ?? null;
    }
    return null;
  };

  return (
    <div className="d-flex flex-column">
      <Row>
        <Col md={2}>
          <FormGroup>
            <Label for="purchasedOrderNoField">PO No.</Label>
            <Input name="purchasedOrderNo" id="purchasedOrderNoField" value={data?.no} disabled />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="vendorIdField">Vendor</Label>
            <Input type="select" name="vendorId" id="vendorIdField" autoComplete="off" value={data?.vendorId} disabled>
              <option value="-1">Select Vendor</option>
              {vendors.map((vendor) => (
                <option value={vendor?.id} key={vendor?.id}>
                  {`${vendor?.name}${vendor?.vatno ? ` - ${vendor?.vatno}` : ''}`}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="purchasedOnField">Purchased On</Label>
            <Input name="purchasedOn" id="purchasedOnField" value={data?.purchasedOn} disabled />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="paymentTermIdField">Payment Term</Label>
            <Input type="select" name="paymentTermId" id="paymentTermIdField" autoComplete="off" value={data?.paymentTermId} disabled>
              <option value="-1">Select Payment Term</option>
              {paymentTerms.map((paymentTerm) => (
                <option value={paymentTerm.id} key={paymentTerm.id}>
                  {paymentTerm.name}
                </option>
              ))}
            </Input>
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
              value={data?.refNo?.length ? data?.refNo : '-'}
              disabled
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
                className={classNames(`table-striped table-borderless`, styles.textAlignCenter)}
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
                    <th style={{ width: '5%' }} className={styles.textAlignRight}>
                      Quantity
                    </th>
                    <th style={{ width: '8%' }} className={styles.textAlignRight}>
                      Total Discount
                    </th>
                    <th className={styles.textAlignRight} style={{ width: '8%' }}>
                      Tax Amount
                    </th>
                    <th className={styles.textAlignRight} style={{ width: '8%' }}>
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.inventories?.length ? (
                    data?.inventories?.map((item, index) => (
                      <tr key={item?.productId}>
                        <td style={{ width: '5%' }} className={styles.textAlignCenter}>
                          {index + 1}
                        </td>
                        <td style={{ width: '5%' }} className={styles.textAlignCenter}>
                          {item?.productId?.replace('PRODT', '')}
                        </td>
                        <td className={styles.textAlignLeft} style={{ width: '30%' }}>
                          {getProductNameById(item?.productId)}
                        </td>
                        <td style={{ width: '5%' }} className={styles.textAlignRight}>
                          {item?.quantity}
                        </td>
                        <td style={{ width: '8%' }} className={styles.textAlignRight}>
                          {item?.totalDiscountPricePerItem}
                        </td>
                        <td style={{ width: '8%' }} className={styles.textAlignRight}>
                          {item?.totalVATOnNetPricePerItem}
                        </td>
                        <td style={{ width: '8%' }} className={styles.textAlignRight}>
                          {item?.totalNetPricePerItem}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={{ paddingLeft: '18px', textAlign: 'left' }} colSpan="12">
                        Add Item&#39;s
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
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
                  data?.inventories
                    ?.reduce((partialSum, inventory) => partialSum + parseFloat(inventory?.totalDiscountPricePerItem ?? 0), 0)
                    .toFixed(4)
                )} SAR`}</strong>
              </p>
            </Col>
            <Col md={4} className={styles.totalBorder}>
              <p className="d-flex justify-content-between">
                <strong>Total Tax Amount: </strong>
                <strong>{`${toFormattedNumber(
                  data?.inventories
                    ?.reduce((partialSum, inventory) => partialSum + parseFloat(inventory?.totalVATOnNetPricePerItem ?? 0), 0)
                    .toFixed(2)
                )} SAR`}</strong>
              </p>
            </Col>
            <Col md={4} className={styles.totalBorder}>
              <p className="d-flex justify-content-between">
                <strong>Total Amount: </strong>
                <strong>{`${toFormattedNumber(
                  data?.inventories
                    ?.reduce((partialSum, inventory) => partialSum + parseFloat(inventory?.totalNetPricePerItem ?? 0), 0)
                    .toFixed(2)
                )} SAR`}</strong>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ViewPurchaseOrder;
