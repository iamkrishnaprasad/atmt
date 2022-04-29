import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row, Table } from 'reactstrap';
import Pagination from '../../components/Pagination';
import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';
import ClientModal from './ClientModal';
import { CLIENT_INITIAL_VALUE } from '../../constant';
import { addClient, updateClient } from '../../redux';
import { getProfileData } from '../../services/profile';

function ClientsPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.clients.data);
  const profile = getProfileData();

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
        setFormData(CLIENT_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, ...payload } = values;
    if (formType === 'add') {
      dispatch(addClient(payload));
    } else if (formType === 'edit') {
      dispatch(updateClient(id, payload));
    }
  };

  return (
    <>
      <Row className="mb-4" style={{ zoom: '65%' }}>
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Clients</div>
              <div
                onClick={() => {
                  openModal('add');
                }}
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                <span>Add Client</span>
              </div>
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th style={{ width: '33%' }} className={styles.textAlignLeft}>
                      NAME
                    </th>
                    <th>PHONE NO.</th>
                    <th>VAT No.</th>
                    <th>CR NO.</th>
                    <th>CLIENT TYPE</th>
                    <th style={{ width: '15%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data?.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map((item, index) => (
                      <tr key={item?.id}>
                        <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                        <td className={styles.textAlignLeft}>
                          {item?.name}
                          {item?.altName ? ` / ${item?.altName}` : null}
                        </td>
                        <td>{item?.phone ? `+966 ${item?.phone}` : '-'}</td>
                        <td>{item?.vatno?.length ? item?.vatno : '-'}</td>
                        <td>{item?.crno?.length ? item?.crno : '-'}</td>
                        <td>{item?.type === 'B' ? 'Business' : 'Individual'}</td>
                        <td>
                          <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                            <i
                              style={{ cursor: 'pointer' }}
                              className="eva eva-book-open-outline"
                              onClick={() => {
                                openModal('readonly', item);
                              }}
                            />
                            {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
                              <i
                                style={{ cursor: 'pointer' }}
                                className="eva eva-edit-2-outline"
                                onClick={() => {
                                  openModal('edit', item);
                                }}
                              />
                            ) : null}
                            {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-trash-2-outline"
                            onClick={() => {
                              alert(`Delete ${item?.id} Client`);
                            }}
                           /> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>NO DATA AVAILABLE.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={pageSize}
                siblingCount={1}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </Widget>
        </Col>
      </Row>
      <ClientModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default ClientsPage;
