import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Moment from 'moment';
import { Spinner } from 'reactstrap';
import styles from '../../components/Tables/Tables.module.scss';
import Template from '../../pdf/Template';
import toFormattedNumber from '../../utils/general';

function TableHead() {
  return (
    <thead>
      <tr>
        <th style={{ width: '5%' }}>SR NO.</th>
        <th style={{ width: '6%' }}>ORDER NO.</th>
        <th style={{ width: '9%' }}>INVOICE NO.</th>
        <th style={{ width: '23%' }} className={styles.textAlignLeft}>
          BILLED TO
        </th>
        <th style={{ width: '10%' }}>REF No.</th>
        <th style={{ width: '11%' }}>PAYMENT TERM</th>
        <th style={{ width: '10%' }}>CREATED ON</th>
        <th style={{ width: '5%' }}>NO. OF ITEMS</th>
        <th style={{ width: '8%' }} className={styles.textAlignRight}>
          TOTAL TAX
        </th>
        <th style={{ width: '8%' }} className={styles.textAlignRight}>
          TOTAL AMOUNT
        </th>
        <th style={{ width: '5%' }}>ACTIONS</th>
      </tr>
    </thead>
  );
}

const TableBody = React.memo(({ currentPage, pageSize, data, onClickOpen }) => (
  <tbody>
    {data?.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map((item, index) => (
      <tr key={item?.id}>
        <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
        <td>{item?.id.replace('ORD', '')}</td>
        <td>{item?.orderNo}</td>
        <td className={styles.textAlignLeft}>
          {item?.client?.name}
          {item?.client?.altname ? ` / ${item?.client?.altname}` : null}
        </td>
        <td>{item?.refNo.length ? item?.refNo : '-'}</td>
        <td>{item?.paymentTerm}</td>
        <td>{item?.issuedDate ? Moment(item?.issuedDate).format('DD-MM-YYYY HH:mm:ss') : '-'}</td>
        <td>{item?.items?.length ?? '0'}</td>
        <td className={styles.textAlignRight}>{`${toFormattedNumber(parseFloat(item?.totalTax).toFixed(2))} SAR`}</td>
        <td className={styles.textAlignRight}>
          {`${toFormattedNumber((parseFloat(item?.netAmount) + parseFloat(item?.totalTax)).toFixed(2))} SAR`}
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
