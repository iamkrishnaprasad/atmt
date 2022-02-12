import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Moment from 'moment';
import styles from '../../components/Tables/Tables.module.scss';
import Template from '../../pdf/Template';
import toFormattedNumber from '../../utils/general';

function TableHead() {
  return (
    <thead>
      <tr>
        <th style={{ width: '7%' }}>SR NO.</th>
        <th style={{ width: '5%' }}>ORDER NO.</th>
        <th style={{ width: '10%' }}>INVOICE NO.</th>
        <th style={{ width: '23%' }} className={styles.textAlignLeft}>
          BILLED TO
        </th>
        <th>REF No.</th>
        <th>PAYMENT TERM</th>
        <th>CREATED ON</th>
        <th style={{ width: '5%' }}>NO. OF ITEMS</th>
        <th style={{ width: '8%' }} className={styles.textAlignRight}>
          TOTAL TAX
        </th>
        <th style={{ width: '8%' }} className={styles.textAlignRight}>
          TOTAL AMOUNT
        </th>
        <th style={{ width: '10%' }}>ACTIONS</th>
      </tr>
    </thead>
  );
}

const TableBody = React.memo(({ currentPage, pageSize, data }) => (
  <tbody>
    {data?.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
      <tr key={`${item?.id}`}>
        <td>{currentPage * pageSize + (index + 1)}</td>
        <td>{item?.id.replace('ORD', '')}</td>
        <td>{item?.orderNo}</td>
        <td className={styles.textAlignLeft}>
          {item?.client?.name}
          {item?.client?.altname ? ` / ${item?.client?.altname}` : null}
        </td>
        <td>{item?.refNo ?? '-'}</td>
        <td>{item?.paymentTerm}</td>
        <td>{item?.issuedDate ? Moment(item?.issuedDate).format('DD-MM-YYYY HH:mm:ss') : '-'}</td>
        <td>{item?.items?.length ?? '0'}</td>
        <td style={{ textAlign: 'right' }}>{`${toFormattedNumber(parseFloat(item?.totalTax).toFixed(2))} SAR`}</td>
        <td style={{ textAlign: 'right' }}>
          {toFormattedNumber((parseFloat(item?.netAmount) + parseFloat(item?.totalTax)).toFixed(2))} SAR
        </td>
        {/* {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? ( */}
        <td>
          <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
            {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-edit-2-outline"
                            onClick={() => {
                              openModal('edit', item);
                            }}
                          /> */}
            <PDFDownloadLink document={<Template order={item} />} fileName={item?.orderNo}>
              {({ loading }) => (loading ? 'Loading document...' : <i style={{ cursor: 'pointer' }} className="fa fa-download" />)}
            </PDFDownloadLink>
            {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-trash-2-outline"
                            onClick={() => {
                              alert(`Delete ${item?.id} Product`);
                            }}
                          /> */}
          </div>
        </td>
        {/* ) : null} */}
      </tr>
    ))}
  </tbody>
));

export { TableHead, TableBody };
