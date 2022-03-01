import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from 'reactstrap';

import classNames from 'classnames';
import Moment from 'moment';
import Widget from '../../components/Widget/Widget';

import styles from '../../components/Tables/Tables.module.scss';
import { fetchPurchaseOrders } from '../../redux';

function PurchaseOrdersPage() {
  const data = useSelector((state) => state.purchaseOrders.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Submit clicked');
  };
  return (
    <>
      <Row className="mb-4" style={{ zoom: '65%' }}>
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Purchase Orders</div>
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                <span>Add Purchase Order</span>
              </div>
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th style={{ width: '10%' }}>ORDER NO.</th>
                    <th style={{ width: '23%' }} className={styles.textAlignLeft}>
                      FROM
                    </th>
                    <th>VAT No.</th>
                    <th>CR No.</th>
                    <th>DATE</th>
                    <th>PRICE</th>
                    <th style={{ width: '15%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map((item, index) => (
                    <tr key={item?.id}>
                      <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                      <td>{item?.purchaseorderno}</td>
                      <td className={styles.textAlignLeft}>{item?.vendorName}</td>
                      <td>{item?.vendorVATNo}</td>
                      <td>{item?.vendorCRNo}</td>
                      <td>{Moment(item?.purchasedate).format('DD-MM-YYYY')}</td>
                      <td className={styles.textAlignRight}>{item?.totalInventoriesPrice ?? '0.00'} SAR</td>
                      <td>
                        <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                          <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-edit-2-outline"
                            onClick={() => {
                              // alert(`Edit ${item?.id} Purchase Order`);
                            }}
                          />
                          <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-trash-2-outline"
                            onClick={() => {
                              // alert(`Delete ${item?.id} Purchase Order`);
                            }}
                          />
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
      <Modal isOpen={isModalOpen} size="xl" fullscreen="true">
        <ModalHeader>Add Purchase Order</ModalHeader>
        <ModalBody>
          <Form id="modalForm" onSubmit={handleSubmit} noValidate>
            <Row>
              <Col md={4}>
                <Row>
                  <Col>
                    <Label for="purchaseordernoField">Purchase Order No.</Label>
                    <Input type="text" name="purchaseorderno" id="purchaseordernoField" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="purchaseordernoField">Purchase Order No.</Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="purchaseordernoField">Purchase Order No.</Label>
                    <Input type="text" name="purchaseorderno" id="purchaseordernoField" />
                  </Col>
                </Row>
              </Col>
              <Col md={{ size: 4, offset: 4 }}>
                <Row>
                  <Col>
                    <Label for="purchaseordernoField">Purchase Order No.</Label>
                    <Input type="text" name="purchaseorderno" id="purchaseordernoField" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" form="modalForm">
            Add
          </Button>
          <Button color="danger" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default PurchaseOrdersPage;
