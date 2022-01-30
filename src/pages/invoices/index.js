import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';

import classNames from 'classnames';
import { addInvoice, fetchInvoices, updateInvoice } from '../../redux';

import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';

import { getProfileData } from '../../services/profile';
import { INVOICE_INITIAL_VALUE } from '../../constant';
import InvoiceModal from './InvoiceModal';

import Template from '../../pdf/Template';

function InvoicesPage() {
  const profile = getProfileData();
  const data = useSelector((state) => state.invoices.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvoices());
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesCount = Math.ceil(data.length / pageSize);

  const setTablePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [formData, setFormData] = useState('');
  const [formType, setFormType] = useState('');

  const openModal = (type, payload = '') => {
    setFormType(type);
    switch (type) {
      case 'edit':
      case 'readonly':
        setFormData(payload);
        break;
      case 'add':
      default:
        setFormData(INVOICE_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, ...payload } = values;
    // if (formType === 'add') {
    //   dispatch(addInvoice(payload));
    // } else if (formType === 'edit') {
    //   dispatch(updateInvoice(id, payload));
    // }
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Invoices</div>
              <div
                onClick={() => {
                  openModal('add');
                }}
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                <span>Add Invoice</span>
              </div>
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th style={{ width: '5%' }}>ORDER NO.</th>
                    <th style={{ width: '10%' }}>INVOICE NO.</th>
                    <th style={{ width: '23%' }} className={styles.textAlignLeft}>
                      BILLED TO
                    </th>
                    <td>REF No.</td>
                    <th>PAYMENT TERM</th>
                    <th>CREATED ON</th>
                    <th>NO. OF ITEMS</th>
                    <th>TOTAL TAX</th>
                    <th>TOTAL AMOUNT</th>
                    {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
                      <th style={{ width: '15%' }}>ACTIONS</th>
                    ) : null}
                  </tr>
                </thead>
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
                      <td>{item?.issuedDate ? Moment(item?.issuedDate).format('DD-MM-YYYY HH:MM.ss') : '-'}</td>
                      <td>{item?.items?.length ?? '0'}</td>
                      <td>{parseFloat(item?.totalTax).toFixed(2)}</td>
                      <td>{(parseFloat(item?.netAmount) + parseFloat(item?.totalTax)).toFixed(2)}</td>
                      {/* {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? ( */}
                      <td>
                        <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                          <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-edit-2-outline"
                            onClick={() => {
                              openModal('edit', item);
                            }}
                          />
                          <PDFDownloadLink document={<Template order={item} />} fileName={item?.orderNo}>
                            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
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
              </Table>
              {pagesCount > 1 ? (
                <Pagination className="pagination-with-border">
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink onClick={(e) => setTablePage(e, currentPage - 1)} previous href="#top" />
                  </PaginationItem>
                  {[...Array(pagesCount)].map((page, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={(e) => setTablePage(e, i)} href="#top">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    <PaginationLink onClick={(e) => setTablePage(e, currentPage + 1)} next href="#top" />
                  </PaginationItem>
                </Pagination>
              ) : null}
            </div>
          </Widget>
        </Col>
      </Row>
      <InvoiceModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default InvoicesPage;
