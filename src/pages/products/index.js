import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row, Table } from 'reactstrap';
import Pagination from '../../components/Pagination';
import Widget from '../../components/Widget/Widget';
import styles from '../../components/Tables/Tables.module.scss';
import ProductModal from './ProductModal';
import { PRODUCT_INITIAL_VALUE } from '../../constant';
import { addProduct, fetchProducts, updateProduct } from '../../redux';
import { getProfileData } from '../../services/profile';
import toFormattedNumber from '../../utils/general';

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
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 150;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [formData, setFormData] = useState('');
  const [formType, setFormType] = useState('');

  const [keyword, setKeyword] = useState('');

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
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center" style={{ minWidth: '250px', margin: '0 5px', position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search a product"
                    maxLength="15"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  {keyword.length ? (
                    <i
                      className="eva eva-close-circle-outline"
                      style={{ position: 'absolute', right: '8px', cursor: 'pointer' }}
                      onClick={(e) => {
                        setKeyword('');
                        setCurrentPage(1);
                      }}
                    />
                  ) : null}
                </div>
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
            </div>
            <div className="widget-table-overflow">
              <Table className={classNames('table-striped table-borderless table-hover', styles.textAlignCenter)} responsive>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>SR NO.</th>
                    <th style={{ width: '5%' }}>CODE</th>
                    <th style={{ width: '23%' }} className={styles.textAlignLeft}>
                      NAME
                    </th>
                    <th style={{ width: '7%' }}>BRAND</th>
                    <th style={{ width: '5%' }}>CATEGORY</th>
                    <th className={styles.textAlignRight}>UNIT PRICE</th>
                    <th className={styles.textAlignRight}>VAT %</th>
                    <th className={styles.textAlignRight}>STOCK</th>
                    <th className={styles.textAlignRight}>TOTAL STOCK VALUE</th>
                    <th>IS ACTIVE?</th>
                    {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
                      <th style={{ width: '5%' }}>ACTIONS</th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((product) => {
                      if (`${product.id.replace('PRODT', '')} ${product.name}`.toLowerCase().includes(keyword.toLowerCase()))
                        return product;
                      return false;
                    })
                    .slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
                    .map((item, index) => (
                      <tr key={item?.id}>
                        <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                        <td>{item?.id.replace('PRODT', '')}</td>
                        <td className={styles.textAlignLeft}>
                          {item?.name}
                          {item?.altName ? ` / ${item?.altName}` : null}
                        </td>
                        <td>{getBrandNameById(item.brandId)}</td>
                        <td>{getCategoryNameById(item.categoryId)}</td>
                        <td className={styles.textAlignRight}>{`${toFormattedNumber(item?.sellingPrice)} SAR`}</td>
                        <td className={styles.textAlignRight}>{getVATPercentageById(item?.vatPercentageId)} %</td>
                        <td className={styles.textAlignRight}>{toFormattedNumber(item?.stockQty)}</td>
                        <td className={styles.textAlignRight}>
                          {`${toFormattedNumber(
                            (
                              Number(item?.sellingPrice) *
                              (Number(getVATPercentageById(item?.vatPercentageId) / 100) + 1) *
                              Number(item?.stockQty)
                            ).toFixed(2)
                          )} SAR`}
                        </td>
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
                              />
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalCount={
                  data.filter((product) => {
                    if (`${product.id.replace('PRODT', '')} ${product.name}`.toLowerCase().includes(keyword)) return product;
                    return false;
                  }).length
                }
                pageSize={pageSize}
                siblingCount={2}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </Widget>
        </Col>
      </Row>
      <ProductModal variant={formType} isOpen={isModalOpen} toggle={toggleModal} data={formData} onSubmit={submitForm} />
    </>
  );
}

export default ProductsPage;
