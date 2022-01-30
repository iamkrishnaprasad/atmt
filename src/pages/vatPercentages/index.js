import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import classNames from 'classnames';
import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';

import VATPercentageModal from './VATPercentageModal';
import { VAT_PERCENTAGE_INITIAL_VALUE } from '../../constant';
import { addVATPercentage, updateVATPercentage } from '../../redux';

function VATPercentagesPage() {
  const dispatch = useDispatch();
  const vatPercentagesData = useSelector((state) => state.vatPercentages.data);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesCount = Math.ceil(vatPercentagesData.length / pageSize);

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
        setFormData(VAT_PERCENTAGE_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, ...payload } = values;
    if (formType === 'add') {
      dispatch(addVATPercentage(payload));
    } else if (formType === 'edit') {
      dispatch(updateVATPercentage(id, payload));
    }
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">VAT</div>
              <div
                onClick={() => {
                  openModal('add');
                }}
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                <span>Add VAT</span>
              </div>
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th className={styles.textAlignLeft}>PERCENTAGE</th>
                    {/* <th style={{ width: '15%' }}>ACTIONS</th> */}
                  </tr>
                </thead>
                <tbody>
                  {vatPercentagesData.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                    <tr key={`${item?.id}`}>
                      <td>{currentPage * pageSize + (index + 1)}</td>
                      <td className={styles.textAlignLeft}>{item?.vatPercentage}</td>
                      <td>
                        <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                          {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-edit-2-outline"
                            onClick={() => {
                              openModal('edit', item);
                            }}
                          /> */}
                          {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-trash-2-outline"
                            onClick={() => {
                              alert(`Delete ${item?.id} VAT`);
                            }}
                          /> */}
                        </div>
                      </td>
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
      <VATPercentageModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default VATPercentagesPage;
