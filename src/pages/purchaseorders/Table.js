import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import styles from '../../components/Tables/Tables.module.scss';
import toFormattedNumber from '../../utils/general';
// import { getPaymentTermNameById } from '../../services/paymentTerms';
import { getVendorNameById } from '../../services/vendors';

function TableHead() {
  return (
    <thead>
      <tr>
        <th style={{ width: '5%' }}>SR NO.</th>
        <th style={{ width: '7%' }}>PO NO.</th>
        <th style={{ width: '13%' }}>PURCHASED FROM</th>
        <th style={{ width: '7%' }}>PURCHASED ON</th>
        <th style={{ width: '7%' }}>PAYMENT TERM</th>
        <th style={{ width: '7%' }}>REF. NO.</th>
        <th style={{ width: '10%' }}>CREATED ON</th>
        <th style={{ width: '6%' }}>NO. OF ITEMS</th>
        <th style={{ width: '7%' }}>TOTAL TAX</th>
        <th style={{ width: '7%' }}>TOTAL AMOUNT</th>
        <th style={{ width: '7%' }}>ACTIONS</th>
      </tr>
    </thead>
  );
}

const TableBody = React.memo(({ currentPage, pageSize, data, onClickOpen }) => (
  <tbody>
    {data?.purchaseOrders?.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map((item, index) => (
      <tr key={item?.id}>
        <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
        <td>{item?.no}</td>
        <td>{data?.vendors?.find((vendor) => vendor.id === item?.vendorId)?.name ?? '-'}</td>
        <td>{item?.purchasedOn}</td>
        <td>{data?.paymentTerms?.find((paymentTerm) => paymentTerm.id === item?.paymentTermId)?.name ?? '-'}</td>
        <td>{item?.refNo.length ? item?.refNo : '-'}</td>
        <td>{item?.createdAt ? Moment(item?.createdAt).format('DD-MM-YYYY HH:mm:ss') : '-'}</td>
        <td>{item?.inventories?.length ?? '0'}</td>
        <td>
          {`${toFormattedNumber(
            item?.inventories
              ?.reduce((partialSum, inventory) => partialSum + parseFloat(inventory?.totalVATOnNetPricePerItem ?? 0), 0)
              .toFixed(2)
          )} SAR`}
        </td>
        <td>
          {`${toFormattedNumber(
            item?.inventories
              ?.reduce((partialSum, inventory) => partialSum + parseFloat(inventory?.totalNetPricePerItem ?? 0), 0)
              .toFixed(2)
          )} SAR`}
        </td>
        <td>
          <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
            <i
              style={{ cursor: 'pointer' }}
              className="eva eva-book-open-outline"
              onClick={() => {
                onClickOpen(item);
              }}
            />
          </div>
        </td>
      </tr>
    ))}
  </tbody>
));

export { TableHead, TableBody };
