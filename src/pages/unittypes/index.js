import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row, Table } from 'reactstrap';
import Pagination from '../../components/Pagination';
import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';
import UnitTypesModal from './UnitTypesModal';
import { UNIT_TYPE_INITIAL_VALUE } from '../../constant';
import { addUnitType, updateUnitType } from '../../redux';

function PaymentTermsPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.unitTypes.data);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
        setFormData(UNIT_TYPE_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, ...payload } = values;
    if (formType === 'add') {
      dispatch(addUnitType(payload));
    } else if (formType === 'edit') {
      dispatch(updateUnitType(id, payload));
    }
  };

  return (
    <>
      <Row className="mb-4" style={{ zoom: '65%' }}>
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Unit Types</div>
              <div
                onClick={() => {
                  openModal('add');
                }}
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                <span>Add Unit Type</span>
              </div>
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th className={styles.textAlignLeft}>NAME</th>
                    <th style={{ width: '15%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map((item, index) => (
                    <tr key={item?.id}>
                      <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                      <td className={styles.textAlignLeft}>{item?.name}</td>
                      <td>
                        <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                          <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-edit-2-outline"
                            onClick={() => {
                              openModal('edit', item);
                            }}
                          />
                          {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-trash-2-outline"
                            onClick={() => {
                              alert(`Delete ${item?.id} Unit Type`);
                            }}
                          /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={pageSize}
                siblingCount={2}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </Widget>
        </Col>
      </Row>
      <UnitTypesModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default PaymentTermsPage;
