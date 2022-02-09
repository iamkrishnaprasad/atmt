import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import classNames from 'classnames';
import { addProduct, fetchProducts, updateProduct } from '../../redux';

import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';
import ProductModal from './ProductModal';
import { PRODUCT_INITIAL_VALUE } from '../../constant';
import { getProfileData } from '../../services/profile';

function ProductsPage() {
  const profile = getProfileData();
  const data = useSelector((state) => state.products.data);
  const categories = useSelector((state) => state.categories.data);
  const brands = useSelector((state) => state.brands.data);
  const vatPercentages = useSelector((state) => state.vatPercentages.data);

  const getCategoryNameById = (id) => {
    if (categories.length > 0) {
      return categories?.find((category) => category.id === id)?.name ?? null;
    }
    return null;
  };
  const getBrandNameById = (id) => {
    if (brands.length > 0) {
      return brands?.find((brand) => brand.id === id)?.name ?? null;
    }
    return null;
  };
  const getVATPercentageById = (id) => {
    if (vatPercentages.length > 0) {
      return vatPercentages?.find((vatPercentage) => vatPercentage.id === id)?.vatPercentage ?? null;
    }
    return null;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 150;
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
        setFormData(PRODUCT_INITIAL_VALUE);
        break;
    }
    setIsModalOpen(true);
  };

  const submitForm = (values) => {
    const { id, stockQty, ...payload } = values;
    if (formType === 'add') {
      dispatch(addProduct(payload));
    } else if (formType === 'edit') {
      dispatch(updateProduct(id, payload));
    }
  };

  return (
    <>
      <Row className="mb-4" style={{ zoom: '65%' }}>
        <Col>
          <Widget>
            <div className={styles.tableTitle}>
              <div className="headline-2">Products</div>
              {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
                <div
                  onClick={() => {
                    openModal('add');
                  }}
                  className="d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                >
                  <i style={{ margin: '0 10px' }} className="eva eva-plus-square-outline" />
                  <span>Add Product</span>
                </div>
              ) : null}
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>SR NO.</th>
                    <th style={{ width: '5%' }}>CODE</th>
                    <th style={{ width: '23%' }} className={styles.textAlignLeft}>
                      NAME
                    </th>
                    <th>BRAND</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>VAT %</th>
                    <th>STOCK</th>
                    <th>IS ACTIVE?</th>
                    {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
                      <th style={{ width: '15%' }}>ACTIONS</th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {data?.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                    <tr key={`${item?.id}`}>
                      <td>{currentPage * pageSize + (index + 1)}</td>
                      <td>{item?.id.replace('PRODT', '')}</td>
                      <td className={styles.textAlignLeft}>
                        {item?.name}
                        {item?.altname ? ` / ${item?.altname}` : null}
                      </td>
                      <td>{getBrandNameById(item.brandId)}</td>
                      <td>{getCategoryNameById(item.categoryId)}</td>
                      <td className={styles.textAlignRight}>{item?.sellingPrice} SAR</td>
                      <td>{getVATPercentageById(item.vatId)} %</td>
                      <td>{item?.stockQty}</td>
                      {item?.isActive ? <td className={styles.isActiveYes}>Yes</td> : <td className={styles.isActiveNo}>No</td>}
                      {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
                        <td>
                          <div style={{ justifyContent: 'space-evenly' }} className="d-flex">
                            <i
                              style={{ cursor: 'pointer' }}
                              className="eva eva-edit-2-outline"
                              onClick={() => {
                                openModal('edit', item);
                              }}
                            />{' '}
                            {/* <i
                            style={{ cursor: 'pointer' }}
                            className="eva eva-trash-2-outline"
                            onClick={() => {
                              alert(`Delete ${item?.id} Product`);
                            }}
                          /> */}
                          </div>
                        </td>
                      ) : null}
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
      <ProductModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default ProductsPage;
