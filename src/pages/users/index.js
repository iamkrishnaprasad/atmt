/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row, Table } from 'reactstrap';
import Pagination from '../../components/Pagination';
import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';
import UserModal from './UserModal';
import { USER_INITIAL_VALUE } from '../../constant';
import { addUser, fetchUsers, updateUser } from '../../redux';

function UsersPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.data);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const userRoles = useSelector((state) => state.userRoles.data);
  const branches = useSelector((state) => state.branches.data);

  const getBranchNameById = (id) => {
    if (branches.length > 0) {
      return branches?.find((branch) => branch.id === id)?.name ?? null;
    }
    return null;
  };

  const getUserRoleById = (id) => {
    if (userRoles.length > 0) {
      return userRoles?.find((userRole) => userRole.id === id)?.role ?? null;
    }
    return null;
  };

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
        setFormData(USER_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, ...payload } = values;
    if (formType === 'add') {
      dispatch(addUser(payload));
    } else if (formType === 'edit') {
      dispatch(updateUser(id, payload));
    }
  };

  return (
    <>
      <Row className="mb-4" style={{ zoom: '65%' }}>
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Users</div>
              <div
                onClick={() => {
                  openModal('add');
                }}
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                <span>Add User</span>
              </div>
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th className={styles.textAlignLeft}>NAME</th>
                    <th>USERNAME</th>
                    <th>USER ROLE</th>
                    <th>CONTACT NO.</th>
                    <th>BRANCH</th>
                    <th>IS ACTIVE?</th>
                    <th style={{ width: '15%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
                    .filter((item) => item?.userRoleId !== 'USRRL00001')
                    .map((item, index) => (
                      <tr key={item?.id}>
                        <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                        <td className={styles.textAlignLeft}>{item?.name}</td>
                        <td>{item?.username}</td>
                        <td>{getUserRoleById(item?.userRoleId)}</td>
                        <td>{item?.contact ? `+966 ${item?.contact}` : '-'}</td>
                        <td>{getBranchNameById(item?.branchId)}</td>
                        {item?.isActive ? <td className={styles.isActiveYes}>Yes</td> : <td className={styles.isActiveNo}>No</td>}
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
                              alert(`Delete ${item?.id} User`);
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
      <UserModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default UsersPage;
