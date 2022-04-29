import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row, Table } from 'reactstrap';
import Pagination from '../../components/Pagination';
import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';
import PurchaseOrderModal from './PurchaseOrderModal';
import { PURCHASE_ORDER_INITIAL_VALUE } from '../../constant';
import { addPurchaseOrder, fetchPurchaseOrders, updatePurchaseOrder } from '../../redux';
import { TableBody, TableHead } from './Table';

function PurchaseOrdersPage() {
  const purchaseOrders = useSelector((state) => state.purchaseOrders.data);
  const paymentTerms = useSelector((state) => state.paymentTerms.data);
  const vendors = useSelector((state) => state.vendors.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, []);

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
        setFormData(PURCHASE_ORDER_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, ...payload } = values;
    if (formType === 'add') {
      dispatch(addPurchaseOrder(payload));
    } else if (formType === 'edit') {
      dispatch(updatePurchaseOrder(id, payload));
    }
  };

  return (
    <>
      <Row className="mb-4" style={{ zoom: '65%' }}>
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Purchase Order</div>
              <div
                onClick={() => {
                  openModal('add');
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
                <TableHead />
                <TableBody
                  currentPage={currentPage}
                  pageSize={pageSize}
                  data={{ purchaseOrders, paymentTerms, vendors }}
                  onClickOpen={(payload) => {
                    openModal('readonly', payload);
                  }}
                />
              </Table>
              <Pagination
                currentPage={currentPage}
                totalCount={purchaseOrders.length}
                pageSize={pageSize}
                siblingCount={2}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </Widget>
        </Col>
      </Row>
      <PurchaseOrderModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default PurchaseOrdersPage;
